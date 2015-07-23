// open link in new tab
$(document).on('click', 'a', function() {
   chrome.tabs.create({
       url: $(this).attr('href')
   });
   return false;
});

var duration = function(time) {
    var dura = (new Date() - time * 1000) / 60000;
    return dura.toFixed();
};
var fansCount = function(count) {
    count = Number(count);
    if (count > 1000000) {
        return (count / 10000).toFixed() + '万';
    } else if (count > 10000) {
        return (count / 10000).toFixed(1) + '万';
    } else {
        return count;
    }
};
var zerofill = function(num) {
    num = num + '';
    return num.length < 2 ? '0' + num : num;
};
var dateFormat = function(time) {
    time = time * 1000;
    var date = new Date(time);
    return date.getFullYear() + '-' +
           zerofill(date.getMonth()) + '-' +
           zerofill(date.getDate()) + '&nbsp;&nbsp;' +
           zerofill(date.getHours()) + ':' +
           zerofill(date.getMinutes()) + ':' +
           zerofill(date.getSeconds());
};
var $list = $('#list');
var data = chrome.extension.getBackgroundPage().getFollowingData();

if (data) {
    var str = '';
    if (data.room_list.length > 0) {
        data.room_list.forEach(function(item) {
            str +=  '<li class="item" >' +
                        '<a href="http://www.douyutv.com' + item.url + '" >' +
                            '<img class="room-capture" alt="' + item.room_name + '" src="' + item.room_src + '" >' +
                            '<div class="room-title" >' + item.room_name + '</div>' +
                            '<div class="room-info" >' +
                                '<span class="cell cell-1" ><span class="icon"></span>' + duration(item.show_time) +'分钟</span>' +
                                '<span class="cell cell-2" title="' + item.nickname + '" ><span class="icon"></span>' + item.nickname + '</span>' +
                                '<span class="cell cell-3" ><span class="icon"></span>' + fansCount(item.online) + '</span>' +
                            '</div>' +
                        '</a>' +
                    '</li>';
        });
    } else {
        str +=  '<li class="item item-empty" >' +
                    '<div>' +
                        '(((┏(;￣▽￣)┛&nbsp;&nbsp;主播正在赶来的路上' +
                    '</div>' +
                '</li>';
    }
    $list.html(str);

    // update time
    $('#update-time').html(dateFormat(data.nowtime));

    $('#need-login').hide();
} else {
    $('#need-login').show();
}
