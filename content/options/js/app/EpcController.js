define('EpcController',function (require) {
    var $          = require('jquery'),
        bootstrap  = require('bootstrap'),
        _          = require('underscore'),
        Q          = require('q'),
        Utils      = require('utils'),
        ClickControl = require('ClickControl'),
        SwitchPanel = require('SwitchPanel');

    return EpcController = function() {
        var self = this,
            callbacksAfterRender = [];

        this.loadModel = function (model) {
            this.model = model;
            self.getAppVersion(model);
            return this;
        };

        this.registerCallbacks = function (cb) {
            if(cb instanceof Array)
                callbacksAfterRender.concat(cb);
            else
                callbacksAfterRender.push(cb);
            return this;
        };

        this.render = function (template) {

            ClickControl.init(self.model.controls,callbacksAfterRender)
                .then(function () {
                    return SwitchPanel.init(self.model.switchs,callbacksAfterRender);
                })
                .then(function () {
                    var compiledHTML = template(self.model);

                    // Add the compiled HTML to main
                    $('#main').append(compiledHTML);

                    self.applyCallbacks(callbacksAfterRender);
                })
                .catch(function (err) {
                    console.log(err);
                });

        };


        this.applyCallbacks = function (callbacks) {
            _.each(callbacks, function (cb) {
                cb.apply(cb.param)
            });
        };

        this.getAppVersion = function (model) {
            Utils.getJSONWithPromise(chrome.extension.getURL('manifest.json'))
                .then(function (items) {
                    model.version = items.version;
                    model.title = items.name;
            });
        };
    };
});