/**
 * Created by Gaplo917 on 2/5/15.
 */

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	var pattern = new RegExp("^(http://www.hkepc.com/forum)");

	if(pattern.test(tab.url)) {

		chrome.storage.sync.get('theme', function (items) {

			if (items.theme !== undefined) {

				chrome.tabs.insertCSS(tabId, {
					file: items.theme + "/common.css",
					allFrames: false,
					runAt: "document_start"
				});

				chrome.tabs.insertCSS(tabId, {
					file: items.theme + "/viewThread.css",
					allFrames: false,
					runAt: "document_start"
				});

				chrome.tabs.insertCSS(tabId, {
					file: items.theme + "/forumdisplay.css",
					allFrames: false,
					runAt: "document_start"
				});

				chrome.tabs.insertCSS(tabId, {
					file: items.theme + "/pm.css",
					allFrames: false,
					runAt: "document_start"
				});

				chrome.tabs.insertCSS(tabId, {
					file: items.theme + "/widget.css",
					allFrames: false,
					runAt: "document_start"
				});
			}

		});
	}

});

