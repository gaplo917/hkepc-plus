/**
 * Created by Gaplo917 on 2/5/15.
 */
define(function (require) {
    var $          = require('jquery'),
        _          = require('underscore'),
        Handlebars = require('handleBars'),
        Q          = require('q'),
        context    = require('context');

    // On document ready
    $(function () {

        // run all these async task first
        Q.all([
            registerPartial('checkbox', 'checkbox.hbs.html'),
            registerPartial('clickControl', 'clickControl.hbs.html')
        ]).then(function () {

            getWithPromise(chrome.runtime.getURL('content/options/templates/main.hbs.html'))
                .then(function (templateHtml) {
                    //render main view
                    var template = Handlebars.compile(templateHtml);
                    var epcPlus = new EPCPlus(template);
                    epcPlus.render();

                });
        });

        var EPCPlus = function(template){
            var self = this,
                callbacksAfterRender = [];

            this.getContext = function () {
                return context;
            };

            this.render = function () {

                self.initControl()
                    .then(function (controlsKey) {

                        return self.renderControl(controlsKey)
                    })
                    .then(function (context) {
                        var compiledHTML = template(context);

                        // Add the compiled HTML to main
                        $('#main').append(compiledHTML);

                        self.applyCallbacks();
                    });

            };

            this.initControl = function () {

                return Q.Promise(function (resolve,reject,notify) {
                    var funcs = [],
                        controlsKey = [];

                    _.each(self.getContext().controls, function (control,controlType) {
                        //save the keys
                        control.id = controlType;
                        controlsKey.push(control.id);

                        //Construct create Control context function
                        funcs.push(
                            getJSONWithPromise(control.context)
                                .then(function (context) {
                                    control.buttons = [];
                                    control.btnClass = controlType + '-control';
                                    _.each(context, function (option,optionKey) {
                                        control.buttons.push({
                                            label: option.name,
                                            value: optionKey
                                        });
                                    });
                                    resolve(controlsKey);
                                })
                        );
                        //Construct bind key callback and call it after view has attached
                        callbacksAfterRender.push(
                            {
                                apply:bindControlsBtn,
                                param:control
                            }
                        )
                    });

                    //run all async task
                    Q.all(funcs);

                });
            };

            this.renderControl = function(controlsKey){
                return Q.Promise(function (resolve,reject,notify) {
                    chrome.storage.sync.get(controlsKey, function (items) {
                        _.each(items, function (item,index) {
                            _.each(self.getContext().controls[index].buttons, function (button) {
                                button.status = button.value == item ? 'btn-success' : 'none';
                                resolve(self.getContext());
                            });
                        });
                    });
                });

            };

            this.applyCallbacks = function () {
                _.each(callbacksAfterRender, function (cb) {
                    cb.apply(cb.param)
                });
            }
        };

        function bindControlsBtn(control){
            return Q.Promise(function (resolve,reject,notify) {
                var buttons = $('.' + control.btnClass);
                buttons.each(function () {
                    $(this).click(function () {
                        //remove all active class first
                        buttons.each(function () {
                            $(this).removeClass('btn-success')
                        });

                        //add active class
                        $(this).addClass('btn-success');

                        var obj = {};
                        obj[control.id] = $(this).attr('data-value');
                        saveSetting(obj);

                        resolve(true);
                    });
                });
            });
        }

        function registerPartial(key, path) {
            return $.get(
                chrome.runtime.getURL('content/options/templates/' + path),
                function (templateHtml) {
                    var template = Handlebars.compile(templateHtml);
                    Handlebars.registerPartial(key, template);
                }
            );

        }

        function saveSetting(obj) {
            return Q.promise(function (resolve) {
                // Save it using the Chrome extension storage API.
                chrome.storage.sync.set(obj, function () {
                    // Notify that we saved.
                    console.log('saved');
                    resolve(true)
                });
            });
        }

        function getJSONWithPromise(url){
            return Q.Promise(function (resolve,reject,notify) {
                $.getJSON(url, function (response) {
                    resolve(response);
                });
            });
        }

        function getWithPromise(url){
            return Q.Promise(function (resolve,reject,notify) {
                $.get(url, function (response) {
                    resolve(response);
                });
            });
        }

        function removeSetting(obj) {
            // Remove it using the Chrome extension storage API.
            chrome.storage.sync.remove(obj, function () {
                // Notify that we removed.
                console.log('removed');
            });
        }
    });
});
