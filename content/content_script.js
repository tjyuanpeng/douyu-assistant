chrome.runtime.sendMessage({
    type: "douyu-following-update-event",
    origin: $('body').html()
});
