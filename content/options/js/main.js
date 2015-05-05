/**
 * Created by Gaplo917 on 2/5/15.
 */

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
                        themeControl: {
                            id: "theme",
                            btnClass: "theme-control",
                            description: "Theme",
                            buttons: [
                                {
                                    // Sample model, will be overwrite later
                                    label: "White",
                                    status: "none",
                                    value: "default"
                                }
                            ]
                        },
                        //fontControl: {
                        //    id: "font",
                        //    btnClass: "font-control",
                        //    description: "Font",
                        //    buttons: [
                        //        {
                        //            // Sample model, will be overwrite later
                        //            label: "White",
                        //            status: "none",
                        //            value: "default"
                        //        }
                        //    ]
                        //},
                    };
                $.getJSON('/content/theme/theme.json', function (themes) {
                    context.themeControl.buttons = [];
                    _.each(themes, function (theme,themeKey) {
                        context.themeControl.buttons.push({
                            label: theme.name,
                            value: themeKey
                        });
                    })
                })
                .then(function () {
                    chrome.storage.sync.get('theme', function (items) {
                        _.each(context.themeControl.buttons, function (button) {
                            if(button.value == items.theme){
                                button.status = "btn-success";
                            }
                            else{
                                button.status = "none";
                            }
                        });

                        var compiledHTML = template(context);

                        // Add the compiled HTML to main
                        $('#main').append(compiledHTML);
                        var buttons = $('.' + context.themeControl.btnClass);
                        buttons.each(function () {
                            $(this).click(function () {
                                //remove all active class first
                                buttons.each(function () {
                                    $(this).removeClass('btn-success')
                                });

                                //add active class
                                $(this).addClass('btn-success');

                                saveTheme($(this).attr('data-value'));

                            });
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

function saveTheme(val) {
    //// Save it using the Chrome extension storage API.
    chrome.storage.sync.set({theme: val}, function () {
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