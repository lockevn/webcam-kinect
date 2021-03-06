chrome.browserAction.setBadgeText({ text: "B.ON" });
chrome.extension.onMessage.addListener(function (msg, _, sendResponse) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tab = tabs[0];

        if (msg.method == "REFRESH") {
            // chrome.tabs.reload(tab.id);
            chrome.tabs.sendMessage(tab.id, "Background page tell you to reload.");
        
        } else if (msg.method == "BACK") {
            chrome.tabs.executeScript(null, { code: "window.history.back();" }, function (results) { console.log(results); });
        } else if (msg.method == "FORWARD") {
            chrome.tabs.executeScript(null, { code: "window.history.forward();" }, function (results) { console.log(results); });

        } else if (msg.method == "NEXTSLIDE") {
            chrome.tabs.executeScript(null, { code: "try{window.nextSlide();}catch(e){}" }, function (results) { console.log(results); });
        } else if (msg.method == "PREVSLIDE") {
            chrome.tabs.executeScript(null, { code: "try{window.prevSlide();}catch(e){}" }, function (results) { console.log(results); });


        } else if (msg.method == "FULLSCREEN") {
            chrome.tabs.executeScript(null, { code: "document.documentElement.webkitRequestFullScreen();" }, function (results) { console.log(results); });
        }
    });

});
