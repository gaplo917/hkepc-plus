/**
 * Created by Gaplo917 on 2/5/15.
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Only fire the when loading ( to prevent it fire in status === complete)
    if (changeInfo.status === "loading"){

        var pattern = new RegExp("^(http://www.hkepc.com/forum)");

        if(pattern.test(tab.url)) {

            chrome.storage.sync.get(['theme','font','addons'], function (items) {

                // apply plugin ONLY if the corresponding setting is set
                if (items.theme !== undefined) {
                    applyPlugin({
                        tabId : tabId,
                        tab: tab,
                        setting : items.theme,
                        json : "theme.json",
                        context: 'content/theme/'
                    });
                }

                if(items.font !== undefined){
                    applyPlugin({
                        tabId : tabId,
                        tab: tab,
                        setting : items.font,
                        json : "font.json",
                        context: 'content/font/'
                    });
                }

                if(items.addons !== undefined){
                    _.each(items.addons,function (addon, addonKey) {

                        if(addon !== undefined){
                            applyPlugin({
                                tabId : tabId,
                                tab: tab,
                                setting : addonKey,
                                json : "addons.json",
                                context: 'content/addons/'
                            });
                        }
                    })

                }

            });
        }
    }

});

function applyPlugin(opts){
    $.getJSON(chrome.runtime.getURL(opts.context + opts.json),function(response){

        //default true
        var isUrlMatched = false;

        if(response[opts.setting].matches !== undefined){
            // by default all plugins will be applied under hkepc.com/forum
            // please specify "matches":["YourURL"] in the json if you want the plugin only be applied on specific URL
            _.each(response[opts.setting].matches, function (match) {
                var pattern = new RegExp(match);
                isUrlMatched = isUrlMatched || pattern.test(opts.tab.url);
            });
        }
        else{
            // if no setting , allow all
            isUrlMatched = true;
        }
        // exit if URL no matched
        if(!isUrlMatched) return;



        if(response[opts.setting].css !== undefined){
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
        }

        if(response[opts.setting].js !== undefined){
            // For each js
            _.each(response[opts.setting].js, function (js) {

                // Determin Absolute/Relative Path
                var file = js.startsWith('/') ? js : opts.context + opts.setting + '/' + js;
                chrome.tabs.executeScript(opts.tabId, {
                    file: file,
                    allFrames: false,
                    runAt: "document_start"
                });

            });
        }

        if(response[opts.setting].addons !== undefined){
            // For each addons
            _.each(response[opts.setting].addons, function (addonKey) {

                applyPlugin({
                    tabId : opts.tabId,
                    setting : addonKey,
                    json : "addons.json",
                    context: 'content/addons/'
                });

            });
        }
    });
}