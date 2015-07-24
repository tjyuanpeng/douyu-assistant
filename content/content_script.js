chrome.runtime.sendMessage({
    type: "douyu-following-update-event",
    origin: document.getElementsByTagName('body')[0].innerHTML
});
