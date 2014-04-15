// /home/vladimir/impress_server/applications/sqlproject/app/js/my/all.js

function threadCreate() {
    var data = {
        'forum': 'forumwithsufficientlylargename',
        'title': 'DEPPPPP',
        'isClosed': true,
        'user': 'john1@mail.ru',
        'date': '2014-01-01 00:00:01',
        'message': 'GO',
        'slug': 'w',
        'isDeleted': true
    }
    sendPost ("db/api/s.stupnikov/thread/create/", data);
}

function postCreate () {
    var data = {
        'isApproved': true,
        'user': 'john1@mail.ru',
        'date': '2014-01-01 00:00:01',
        'message': 'HEEEEEE',
        'isSpam': false,
        'isHighlighted': true,
        'thread': 3,
        'forum': 'forumwithsufficientlylargename',
        'isDeleted': false,
        'isEdited': true
    }
    sendPost ("db/api/s.stupnikov/post/create/", data);
}

function forumListUsers() {
    var data = {
        'since_id': 1,
        'limit' : 2,
        'order': 'asc',
        'forum': 'forumwithsufficientlylargename'
    }
    sendGet ("db/api/s.stupnikov/forum/listUsers/", data);
}

function forumListThreads() {
    var data = {
        'related': ['user', 'forum'],
        'since': '2000-01-02 00:00:00',
        'limit': 2,
        'order': 'asc',
        'forum': 'forumwithsufficientlylargename'
    }
    sendGet ("db/api/s.stupnikov/forum/listThreads/", data);
}

function postList() {
    var data = {
        'since': '2000-01-02 00:00:00',
        'limit': 2,
        'order': 'asc',
        'thread': 3
    }
    sendGet ("db/api/s.stupnikov/post/list/", data);
}

function forumListPosts () {
    var data = {
        'related': ['thread', 'user', 'forum'],
        'since': '2000-01-02 00:00:00',
        'limit': 2,
        'order': 'asc',
        'forum': 'forumwithsufficientlylargename'
    }
    sendGet ("db/api/s.stupnikov/forum/listPosts/", data);
}

function forumDetails () {
    var data = {
        'related': ['user'],
        'forum': 'foamwithsufficientlylargename'
    }
    sendGet ("db/api/s.stupnikov/forum/details/", data);
}

function postDetails() {
    var data = {
        'related': [],
        'post': 10
    }
    sendGet ("db/api/s.stupnikov/post/details/", data);
}

function userDetails () {
    var data = {
        'user': 'qwerty1112@mail.ru'
    }
    sendGet ("db/api/s.stupnikov/user/details/", data);
}

function forumCreate () {
    var data = {
        'name': 'Forum With Sufficiently Large Name', 
        'short_name': 'foamwithsufficientlylargename', 
        'user': 'john000@mail.ru'
    }
    sendPost ("db/api/s.stupnikov/forum/create/", data);
}

function userCreate () {
    var data = {
        'username': 'user1', 
        'about': 'hello im user1', 
        'isAnonymous': false, 
        'name': 'John', 
        'email': 'john0006@mail.ru'
    }
    sendPost ("db/api/s.stupnikov/user/create/", data);
}

function sendGet (url, data) {
    params = "?";
    for (var key in data) {
        if (!(data[key] instanceof Array)) {
            params += (key + '=' + data[key] + '&');
        } else {
            params += (key + "=%5B");
            if (data[key].length != 0) {
                data[key].forEach(function(elem) {
                    params += ("'" + elem + "', ");
                });
                params = params.substr(0, params.length - 2);
            }
            params += "%5D&";
        }
    }
    params = params.substr(0, params.length - 1);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200) {
           console.log(JSON.parse(this.response));
       }
    }			
    xhr.open('GET', url + params, true);
    xhr.send();
}

function sendPost (url, data) {
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200) {
           console.log(JSON.parse(this.response));
       }
    }			
    xhr.open('POST', url, true);
    xhr.send(data);
}

