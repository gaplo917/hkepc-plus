/**
 * Created by Gaplo917 on 2/5/15.
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Only fire the when loading ( to prevent it fire in status === complete)
    if (changeInfo.status === "loading"){

        var pattern = new RegExp("^(http://www.hkepc.com/forum)");

        if(pattern.test(tab.url)) {

            chrome.storage.sync.get(['theme','font'], function (items) {

                // apply plugin ONLY if the corresponding setting is set
                if (items.theme !== undefined) {
                    applyPlugin({
                        tabId : tabId,
                        setting : items.theme,
                        json : "theme.json",
                        context: 'content/theme/'
                    });
                }

                if(items.font !== undefined){
                    applyPlugin({
                        tabId : tabId,
                        setting : items.font,
                        json : "font.json",
                        context: 'content/font/'
                    });
                }

            });
        }
    }

});

function applyPlugin(opts){
    $.getJSON(chrome.runtime.getURL(opts.context + opts.json),function(response){

        // For each css
        _.each(response[opts.setting].css, function (css) {

            // Determin Absolute/Relative Path
            var file = css.startsWith('/') ? css : opts.context + opts.setting + '/' + css;
            chrome.tabs.insertCSS(opts.tabId, {
                file: file,
                allFrames: false,
                runAt: "document_start"
            });

        });

        // For each js
        _.each(response[opts.setting].js, function (js) {

            // Determin Absolute/Relative Path
            var file = js.startsWith('/') ? js : 'content/theme/' + opts.setting + '/' + js;
            chrome.tabs.executeScript(opts.tabId, {
                file: file,
                allFrames: false,
                runAt: "document_start"
            });

        });

    });
}