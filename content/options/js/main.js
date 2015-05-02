/**
 * Created by Gaplo917 on 2/5/15.
 */
var THEME_PREIFX = "content/theme/default";

$(function () {

    registerPartial('checkbox', 'checkbox.hbs.html')
        .then(function () {
            registerPartial('clickControl', 'clickControl.hbs.html');
        })
        .then(function () {
            $.get(chrome.runtime.getURL('content/options/templates/main.hbs.html'), function (templateHtml) {
                var template = Handlebars.compile(templateHtml),
                    context = {
                        title: "HKEPC Plus",
                        checkbox: {
                            label: "123"
                        },
                        clickControl: {
                            id: "theme",
                            btnClass: "theme-control",
                            description: "Theme",
                            buttons: [
                                {
                                    label: "White",
                                    status: "none",
                                    value: 0
                                },
                                {
                                    label: "Black",
                                    status: "btn-success",
                                    value: 1
                                }
                            ]
                        }
                    };

                chrome.storage.sync.get('theme', function (items) {
                    if (items.theme === undefined) {
                        context.clickControl.buttons[0].status = "btn-success";
                        context.clickControl.buttons[1].status = "none";
                    }
                    else {
                        context.clickControl.buttons[0].status = "none";
                        context.clickControl.buttons[1].status = "btn-success";
                    }

                    var compiledHTML = template(context);

                    // Add the compiled HTML to main
                    $('#main').append(compiledHTML);
                    var buttons = $('.' + context.clickControl.btnClass);
                    buttons.each(function () {
                        $(this).click(function () {
                            //remove all active class first
                            buttons.each(function () {
                                $(this).removeClass('btn-success')
                            });

                            //add active class
                            $(this).addClass('btn-success');

                            if ($(this).attr('data-value') == '0') {
                                removeTheme();
                            }
                            else if ($(this).attr('data-value') == '1') {
                                saveTheme();
                            }
                        });
                    });
                });
            });
        }).done();
});

function registerPartial(key, path) {
    return $.get(
        chrome.runtime.getURL('content/options/templates/' + path),
        function (templateHtml) {
            var template = Handlebars.compile(templateHtml);
            Handlebars.registerPartial(key, template);
        }
    );

}

function saveTheme() {
    //// Save it using the Chrome extension storage API.
    chrome.storage.sync.set({theme: THEME_PREIFX}, function () {
        // Notify that we saved.
        console.log('theme saved');
    });
}

function removeTheme() {
    //// Remove it using the Chrome extension storage API.
    chrome.storage.sync.remove('theme', function () {
        // Notify that we saved.
        console.log('theme removed');
    });
}