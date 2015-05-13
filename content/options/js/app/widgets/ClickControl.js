/**
 * Created by Gaplo917 on 9/5/15.
 */
define("ClickControl",function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Utils = require('utils'),
        Q = require('q');

    return ClickControl = {

        init : function (controls,callbacksAfterRender) {

            return Q.Promise(function (resolve,reject,notify) {
                var funcs = [],
                    controlsKey = [];

                _.each(controls, function (control,controlType) {
                    //save the keys
                    control.id = controlType;
                    controlsKey.push(control.id);

                    //Construct create Control context function
                    funcs.push(
                        Utils.getJSONWithPromise(control.context)
                            .then(function (context) {
                                control.buttons = [];
                                control.btnClass = controlType + '-control';
                                _.each(context, function (option,optionKey) {
                                    control.buttons.push({
                                        label: option.name,
                                        description:option.description,
                                        value: optionKey
                                    });
                                });
                            })
                    );
                    //Construct bind key callback and call it after view has attached
                    callbacksAfterRender.push(
                        {
                            apply:ClickControl.bindBtn,
                            param:control
                        }
                    )
                });

                //run all async task
                Q.all(funcs).then(function () {
                    ClickControl.matchControlButtonStatus({
                        model:controls,
                        controlsKey: controlsKey,
                        match: function (button,value) {
                            button.status = button.value == value ? 'btn-success' : 'none';
                        }
                    });
                    resolve(controlsKey);
                });


            });
        },
        matchControlButtonStatus : function(opts){
            return Q.Promise(function (resolve,reject,notify) {
                chrome.storage.sync.get(opts.controlsKey, function (items) {
                    _.each(items, function (item,index) {
                        _.each(opts.model[index].buttons, function (button) {
                            opts.match(button,item);

                        });
                    });
                    resolve();

                });
            });

        },
        bindBtn: function (control) {
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
                    Utils.saveSetting(obj);

                });
            });
        }
    }
});