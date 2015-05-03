/**
 * Created by Gaplo917 on 2/5/15.
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	var pattern = new RegExp("^(http://www.hkepc.com/forum)");

	if(pattern.test(tab.url)) {

		chrome.storage.sync.get('theme', function (items) {

            // ONLY if the theme is set
			if (items.theme !== undefined) {
                getJSON(chrome.runtime.getURL(items.theme + '/theme.json'),function(response){
                    _.each(response.css, function (css) {
                        chrome.tabs.insertCSS(tabId, {
                            file: items.theme + '/' + css,
                            allFrames: false,
                            runAt: "document_start"
                        });
                    });

                    // For each js
                    _.each(response.js, function (js) {
                        chrome.tabs.executeScript(tabId, {
                            file:items.theme +'/' + js,
                            runAt: "document_start"
                        });
                    });

                });

			}

		});
	}

});

function getJSON(url,cb){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url , true);
    xhr.setRequestHeader("Content-Type","text/html");
    xhr.send();
    xhr.onreadystatechange = function()
    {
        cb(JSON.parse(xhr.response));
    }
}

