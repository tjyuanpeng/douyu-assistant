var tool = {
    _getId: function() {
        var getIdItem = function() {
            return new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 3);
        };
        return 'AV' + getIdItem() + getIdItem() + getIdItem();
    },
    getId: function() {
        var key = 'analytics-id';
        var id = localStorage.getItem(key);
        if (!id) {
            id = tool._getId();
            localStorage.setItem(key, id);
        }
        return id;
    },
    ajax: function(options, callback) {
        var url = options.url;
        var method = options.method || 'get';
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (method === 'post' || method === 'put') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        if (options.appId) {
            xhr.setRequestHeader('X-AVOSCloud-Application-Id', options.appId);
        }
        if (options.appKey) {
            xhr.setRequestHeader('X-AVOSCloud-Application-Key', options.appKey);
        }
        xhr.onload = function(data) {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                callback(null, JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = function(data) {
            callback(null, data);
        };
        xhr.send(JSON.stringify(options.data));
    }
};

var appId = 'xxyfocl0hed0chk9l3srlb1oufkppqzi2yn5f9g26c7lxz4y';
var appKey = '97jbrjmxwlrzcz1jijp9husgh7z38gjz7mpbix19jrw7899o';

var send = function(options, callback) {
    options.attributes = options.attr;
    delete options.attr;

    tool.ajax({
        url: 'https://api.leancloud.cn/1.1/stats/open/collect',
        appId: 'xxyfocl0hed0chk9l3srlb1oufkppqzi2yn5f9g26c7lxz4y',
        appKey: '97jbrjmxwlrzcz1jijp9husgh7z38gjz7mpbix19jrw7899o',
        method: 'post',
        data: {
            client: {
                id: tool.getId(),
                platform: 'web',
                app_version: '1.0.0',
                app_channel: 'chrome extension'
            },
            session: {
                id: tool._getId()
            },
            events: [options]
        }
    }, function(result, error) {
        if (callback) {
            callback(result, error);
        }
    });
};
