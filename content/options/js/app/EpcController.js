define('EpcController',function (require) {
    var $          = require('jquery'),
        _          = require('underscore'),
        Q          = require('q'),
        Utils      = require('utils');

    return EpcController = function(){
        var self = this,
            callbacksAfterRender = [];

        this.loadModel = function (modal) {
            this.model = modal;

            return this;
        };

        this.render = function (template) {

            self.initControlButtons()
                .then(function (controlsKey) {

                    return self.matchControlButtonStatus({
                        controlsKey:controlsKey,
                        match : function (button,value) {
                            button.status = button.value == value ? 'btn-success' : 'none';
                        }
                    });

                })
                .then(
                    function () {

                        return self.initSwitchButtons();
                    }
                ).then(function (switchKey) {
                    console.log(switchKey);
                    return self.matchSwitchButtonStatus({
                        controlsKey:switchKey,
                        match : function (button,value) {
                            button.status = value[button.key] == 1 ? 'btn-success' : 'none';
                        }
                    })
                })
                .then(function () {
                    var compiledHTML = template(self.model);

                    console.log(self.model);

                    // Add the compiled HTML to main
                    $('#setting').append(compiledHTML);

                    self.applyCallbacks(callbacksAfterRender);
                });

        };

        this.initControlButtons = function () {

            return Q.Promise(function (resolve,reject,notify) {
                var funcs = [],
                    controlsKey = [];

                _.each(self.model.controls, function (control,controlType) {
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
                                        value: optionKey
                                    });
                                });
                                resolve(controlsKey);
                            })
                    );
                    //Construct bind key callback and call it after view has attached
                    callbacksAfterRender.push(
                        {
                            apply:Utils.bindControlsBtn,
                            param:control
                        }
                    )
                });

                //run all async task
                Q.all(funcs);

            });
        };

        this.initSwitchButtons = function () {

            return Q.Promise(function (resolve,reject,notify) {
                var funcs = [],
                    controlKey = [];

                _.each(self.model.switchs, function (control,controlType) {
                    controlKey.push(controlType);

                    //Construct create Control context function
                    funcs.push(
                        Utils.getJSONWithPromise(control.context)
                            .then(function (context) {
                                control.buttons = [];
                                control.btnClass = controlType + '-control';
                                _.each(context, function (option,optionKey) {
                                    //save the keys
                                    control.id = option.name;

                                    control.buttons.push({
                                        key: optionKey,
                                        label: option.name,
                                        value: option.id
                                    });
                                });
                                resolve(controlKey);
                            })
                    );

                    //Construct bind key callback and call it after view has attached
                    callbacksAfterRender.push(
                        {
                            apply:Utils.bindSwitchBtn,
                            param:control
                        }
                    )
                });

                //run all async task
                Q.all(funcs);

            });
        };

        this.matchControlButtonStatus = function(opts){
            return Q.Promise(function (resolve,reject,notify) {
                chrome.storage.sync.get(opts.controlsKey, function (items) {
                    _.each(items, function (item,index) {
                        _.each(self.model.controls[index].buttons, function (button) {
                            opts.match(button,item);

                        });
                    });
                    resolve();

                });
            });

        };


        this.matchSwitchButtonStatus = function(opts){
            return Q.Promise(function (resolve,reject,notify) {
                chrome.storage.sync.get(opts.controlsKey, function (items) {
                    _.each(items, function (item,index) {
                        _.each(self.model.switchs[index].buttons, function (button) {
                            opts.match(button,item);
                        });
                    });
                    resolve();

                });
            });

        };

        this.applyCallbacks = function (callbacks) {
            _.each(callbacks, function (cb) {
                cb.apply(cb.param)
            });
        }
    };
});