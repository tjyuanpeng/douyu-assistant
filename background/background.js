localStorage.setItem('app-version', '1.0.0');

var DATA;
var NOTIFICATION_ID = 'douyu-following-online-notification';
var container = $('<div></div>').appendTo('body');
var frameTmpl = '<iframe src="http://www.douyutv.com/member/cp/get_follow_list" ></iframe>';

// register callback
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
    if(request.type !== 'douyu-following-update-event') {
        return;
    }

    var data;
    try {
        data = JSON.parse(request.origin);
    } catch(e) {
        // not login or be blocked
        console.error(request.origin);
        chrome.browserAction.setBadgeText({
            text: 'x'
        });
    }
    DATA = data;

    // set badge
    if (data) {
        chrome.browserAction.setBadgeText({
            text: data.room_list.length + ''
        });
    }
});

// run loop
function run() {
    container.empty().append(frameTmpl);
    setTimeout(run, 10000);
}
run();

// export to popup
function getFollowingData() {
    return DATA;
}

chrome.runtime.onInstalled.addListener(function(details){
    console.log('onInstalled.');

    analyzer.send({
        event: 'douyu-assistant-installed',
        attr: {
            testdata: '123',
        },
        duration: 0
    }, function(result, error) {
    });
});
