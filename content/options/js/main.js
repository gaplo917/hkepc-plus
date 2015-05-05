/**
 * Created by Gaplo917 on 2/5/15.
 */
var context = {
    title: "HKEPC +",
    checkbox: {
        label: "123"
    },
    controls:{
        theme:{
            context:"/content/theme/theme.json",
            btnClass: "theme-control",
            description: "Theme (主題)",
            buttons: [
                {
                    // Sample model, will be overwrite later
                    label: "White",
                    status: "none",
                    value: "default"
                }
            ]
        },
        font:{
            context:"/content/font/font.json",
            btnClass: "font-control",
            description: "Font (字型)",
            buttons: [
                {
                    // Sample model, will be overwrite later
                    label: "White",
                    status: "none",
                    value: "default"
                }
            ]
        }
    }
};
$(function () {

    registerPartial('checkbox', 'checkbox.hbs.html')
        .then(function () {
            registerPartial('clickControl', 'clickControl.hbs.html');
        })
        .then(function () {
            $.get(chrome.runtime.getURL('content/options/templates/main.hbs.html'), function (templateHtml) {

                //render main view
                var template = Handlebars.compile(templateHtml);

                var funcs = [],
                    callbacks = [],
                    controlsKey = [];

                _.each(context.controls, function (control,controlType) {

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
                            })
                        })
                    );
                    //Construct bind key callback and call it after view has attached
                    callbacks.push(
                        {
                            apply:bindControlsBtn,
                            param:control
                        }
                    )
                });
                Q.all(funcs).then(function () {

                    chrome.storage.sync.get(controlsKey, function (items) {
                        _.each(items, function (item,index) {
                            _.each(context.controls[index].buttons, function (button) {
                                button.status = button.value == item ? 'btn-success' : 'none';
                            });
                        });

                        var compiledHTML = template(context);

                        // Add the compiled HTML to main
                        $('#main').append(compiledHTML);

                        _.each(callbacks, function (cb) {
                            cb.apply(cb.param)
                        });

                    });
                })

            });
        }).done();
});

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
                console.log(obj);
                save(obj);

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

function save(val) {
    //// Save it using the Chrome extension storage API.
    chrome.storage.sync.set(val, function () {
        // Notify that we saved.
        console.log('theme saved');
    });
}

function getJSONWithPromise(url){
    return Q.Promise(function (resolve,reject,notify) {
        $.getJSON(url, function (response) {
            resolve(response);
        });
    });
}

function removeTheme() {
    //// Remove it using the Chrome extension storage API.
    chrome.storage.sync.remove('theme', function () {
        // Notify that we saved.
        console.log('theme removed');
    });
}