/**
 * Created by Gaplo917 on 2/5/15.
 */
define(function (require) {
    var $          = require('jquery'),
        _          = require('underscore'),
        Handlebars = require('handleBars'),
        Q          = require('q'),
        Utils      = require('utils'),
        EpcModel    = require('EpcModel'),
        EpcController    = require('EpcController');

    // On document ready
    $(function () {

        // run all these async task first
        Q.all([
            Utils.registerPartial('switchControl', 'switchControl.hbs.html'),
            Utils.registerPartial('clickControl', 'clickControl.hbs.html')
        ]).then(function () {

            Utils.getWithPromise(chrome.runtime.getURL('content/options/templates/main.hbs.html'))
                .then(function (templateHtml) {
                    //render main view
                    var template = Handlebars.compile(templateHtml);
                    var epc = new EpcController();
                    epc.loadModel(EpcModel)
                        .render(template)

                });
        });


        $('.developer > .clear-btn').click(function () {
            chrome.storage.sync.clear();
        });
    });
});
