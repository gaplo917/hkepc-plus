/**
 * Created by Gaplo917 on 9/5/15.
 */
define("SwitchPanel",function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Utils = require('utils'),
        Q = require('q');

    return SwitchPanel = {
        init : function (switches,callbacksAfterRender) {
            return Q.Promise(function (resolve,reject,notify) {
                var funcs = [],
                    controlKey = [];

                _.each(switches, function (control,controlType) {
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
                                        description:option.description,
                                        label: option.name,
                                        value: option.id
                                    });
                                });
                            })
                    );

                    //Construct bind key callback and call it after view has attached
                    callbacksAfterRender.push(
                        {
                            apply:SwitchPanel.bindSwitchBtn,
                            param:control
                        }
                    );


                });

                //run all async task
                Q.all(funcs).then(function () {

                    return SwitchPanel.matchSwitchButtonStatus({
                        model: switches,
                        controlsKey:controlKey,
                        match : function (button,value) {
                            button.status = value[button.key] == 1 ? 'btn-success' : 'none';
                        }
                    });

                }).catch(function (err) {
                    console.log(err);
                    reject();
                }).finally(function () {
                    resolve();
                });

            });
        },

        bindSwitchBtn: function (switchControl) {
            var buttons = $('.' + switchControl.btnClass);
            buttons.each(function () {
                $(this).click(function () {
                    var btn = $(this);

                    if($(this).hasClass('btn-success')){
                        //remove active class
                        $(this).removeClass('btn-success');

                        chrome.storage.sync.get(['addons'], function (items) {
                            _.each(switchControl.buttons, function (button) {
                                if(button.value ==  btn.attr('data-value')){
                                    delete items['addons'][button.key];
                                }
                            });

                            Utils.saveSetting(items);
                        });
                    }
                    else{

                        //add active class
                        $(this).addClass('btn-success');

                        chrome.storage.sync.get(['addons'], function (items) {

                            if(items['addons'] == undefined){
                                items['addons'] = {};
                            }

                            _.each(switchControl.buttons, function (button) {
                                if(button.value ==  btn.attr('data-value')){
                                    items['addons'][button.key] = 1;
                                }
                            });

                            Utils.saveSetting(items);
                        });

                    }
                });
            });
        },
        matchSwitchButtonStatus : function(opts){
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

        }
    }
});