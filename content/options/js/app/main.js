/**
 * Created by Gaplo917 on 2/5/15.
 */
define(function (require) {
    var $          = require('jquery'),
        bootstrap  = require('bootstrap'),
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
            Utils.registerPartial('switchControl', 'switchControl.hbs'),
            Utils.registerPartial('clickControl', 'clickControl.hbs'),
            Utils.registerPartial('donation', 'donation.hbs')
        ]).then(function () {

            return Utils.getWithPromise(chrome.runtime.getURL('content/options/templates/main.hbs'))
                .then(function (templateHtml) {
                    //render main view
                    var template = Handlebars.compile(templateHtml);
                    var epc = new EpcController();
                    epc.loadModel(EpcModel)
                        .registerCallbacks(function () {
                            $('[data-toggle="popover"]').popover({
                                trigger: 'manual',
                                html:true,
                                delay: { "show": 200, "hide": 1000 }
                            }).on("mouseenter", function () {
                                var _this = this;
                                $(this).popover("show");
                                $(this).siblings(".popover").on("mouseleave", function () {
                                    $(_this).popover('hide');
                                });
                            }).on("mouseleave", function () {
                                var _this = this;
                                setTimeout(function () {
                                    if (!$(".popover:hover").length) {
                                        $(_this).popover("hide")
                                    }
                                }, 100);
                            });
                        })
                        .render(template);
                });
        });


        $('.developer > .clear-btn').click(function () {
            chrome.storage.sync.clear();
            location.reload();
        });
    });
});
