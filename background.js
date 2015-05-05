/**
 * Created by Gaplo917 on 2/5/15.
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Only fire the when loading ( to prevent it fire in status === complete)
    if (changeInfo.status === "loading"){

        var pattern = new RegExp("^(http://www.hkepc.com/forum)");

        if(pattern.test(tab.url)) {

            chrome.storage.sync.get(['theme','font'], function (items) {

                // ONLY if the theme is set
                if (items.theme !== undefined) {
                    getJSON(chrome.runtime.getURL('content/theme/theme.json'),function(response){
                        _.each(response[items.theme].css, function (css) {
                            // Determin Absolute/Relative Path
                            var file = css.startsWith('/') ? css : 'content/theme/' + items.theme + '/' + css;
                            chrome.tabs.insertCSS(tabId, {
                                file: file,
                                allFrames: false,
                                runAt: "document_start"
                            });
                        });

                        // For each js
                        _.each(response[items.theme].js, function (js) {
                            var file = js.startsWith('/') ? js : 'content/theme/' + items.theme + '/' + js;

                            chrome.tabs.executeScript(tabId, {
                                file: file,
                                runAt: "document_start"
                            });
                        });

                    });

                }

            });
        }
    }

});

function getJSON(url,cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url , true);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send();
    xhr.onreadystatechange = function()
    {
        try{
            cb(JSON.parse(xhr.response));
        }catch(err){
            //Known error  (Uncaught SyntaxError: Unexpected end of input) on v8 compiler, no need to handle
        }
    }
}

