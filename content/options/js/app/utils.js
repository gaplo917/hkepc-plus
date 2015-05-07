/**
 * Created by Gaplo917 on 8/5/15.
 */
define("utils",function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Handlebars = require('handleBars'),
        Q = require('q');

    return Utils = {
        bindControlsBtn: function(control){
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
                        Utils.saveSetting(obj);

                        resolve(true);
                    });
                });
            });
        },
        registerPartial: function(key, path) {
            return $.get(
                chrome.runtime.getURL('content/options/templates/' + path),
                function (templateHtml) {
                    var template = Handlebars.compile(templateHtml);
                    Handlebars.registerPartial(key, template);
                }
            );

        },
         saveSetting:function(obj) {
            return Q.promise(function (resolve) {
                // Save it using the Chrome extension storage API.
                chrome.storage.sync.set(obj, function () {
                    // Notify that we saved.
                    console.log('saved');
                    resolve(true)
                });
            });
        },
         getJSONWithPromise:function(url){
            return Q.Promise(function (resolve,reject,notify) {
                $.getJSON(url, function (response) {
                    resolve(response);
                });
            });
        },
         getWithPromise:function(url){
            return Q.Promise(function (resolve,reject,notify) {
                $.get(url, function (response) {
                    resolve(response);
                });
            });
        },
         removeSetting: function(obj) {
            // Remove it using the Chrome extension storage API.
            chrome.storage.sync.remove(obj, function () {
                // Notify that we removed.
                console.log('removed');
            });
        }
    }

});