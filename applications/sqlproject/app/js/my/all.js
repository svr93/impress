// /home/vladimir/impress_server/applications/sqlproject/app/js/my/all.js

//Forum
//1) create - post
function forumCreate() {
    var data = {
        'name': 'Forum1', 
        'short_name': 'forum1', 
        'user': 'svr93@i.ua'
    }
    sendPost ("db/api/forum/create/", data);
}
//2) details - get
function forumDetails() {
    var data = {
        'related': ['user'], //optional
        'forum': 'forum1'
    }
    sendGet ("db/api/forum/details/", data);
}
//3) listPosts - get
function forumListPosts() {
    var data = {
        'related': ['thread', 'user', 'forum'], //optional
        'since': '2000-01-01 00:00:00', //optional
        'limit': 3, //optional
        'order': 'asc', //optional
        'forum': 'forum1'
    }
    sendGet ("db/api/forum/listPosts/", data);
}
//4) listThreads - get
function forumListThreads() {
    var data = {
        'related': ['user', 'forum'], //optional
        'since': '2000-01-01 00:00:00', //optional
        'limit': 3, //optional
        'order': 'asc', //optional
        'forum': 'forum1'
    }
    sendGet ("db/api/forum/listThreads/", data);
}
//5) listUsers - get
function forumListUsers() {
    var data = {
        'since_id': 1, //optional
        'limit' : 3, //optional
        'order': 'asc', //optional
        'forum': 'forum1'
    }
    sendGet ("db/api/forum/listUsers/", data);
}
//Post
//6) create - post
function postCreate() {
    var data = {
        //'parent': 10, //optional
        'isApproved': true, //optional
        'user': 'svr93@i.ua',
        'date': '2000-01-01 00:00:00',
        'message': 'Message1',
        'isSpam': false, //optional
        'isHighlighted': true, //optional
        'thread': 1,
        'forum': 'forum1',
        'isDeleted': false, //optional
        'isEdited': true //optional
    }
    sendPost ("db/api/post/create/", data);
}
//7) details - get
function postDetails() {
    var data = {
        'related': ['user', 'thread', 'forum'], //optional
        'post': 10
    }
    sendGet ("db/api/post/details/", data);
}
//8) list - get
function postList() {
    var data = {
        'since': '2000-01-01 00:00:00', //optional
        'limit': 3, //optional
        'order': 'asc', //optional
        'thread': 3
    }
    sendGet ("db/api/post/list/", data);
}
//9) remove - post
function postRemove() {
    var data = {
        'post': 10,
    }
    sendPost ("db/api/post/remove/", data);
}
//10) restore - post
function postRestore() {
    var data = {
        'post': 10,
    }
    sendPost ("db/api/post/restore/", data);
}
//11) update - post
function postUpdate() {
    var data = {
        'post': 10,
        'message': 'Message2'
    }
    sendPost ("db/api/post/update/", data);
}
//12) vote - post
function postVote() {
    var data = {
        'post': 10,
        'vote': 1
    }
    sendPost ("db/api/post/vote/", data);
}
//User
//13) create - post
function userCreate() {
    var data = {
        'username': 'user1', 
        'about': 'Im user1', 
        'isAnonymous': false, //optional
        'name': 'Name1', 
        'email': 'svr93@i.ua'
    }
    sendPost ("db/api/user/create/", data);
}
//14) details - get
function userDetails() {
    var data = {
        'user': 'svr93@i.ua'
    }
    sendGet ("db/api/user/details/", data);
}
//15) follow - post
function userFollow() {
    var data = {
        'follower': 'svr93@i.ua',
        'followee': 'svr93@i.ua'
    }
    sendPost ("db/api/user/follow/", data);
}
//16) listFollowers - get
function userListFollowers() {
    var data = {
        'limit': 3, //optional
        'order': 'asc', //optional
        'since_id': 1, //optional
        'user': 'svr93@i.ua'
    }
    sendGet ("db/api/user/listFollowers/", data);
}
//17) listFollowing - get
function userListFollowing() {
    var data = {
        'limit': 3, //optional
        'order': 'asc', //optional
        'since_id': 1, //optional
        'user': 'svr93@i.ua'
    }
    sendGet ("db/api/user/listFollowing/", data);
}
//18) listPosts - get
function userListPosts() {
    var data = {
        'limit': 3, //optional
        'order': 'asc', //optional
        'since': '2000-01-01 00:00:00', //optional
        'user': 'svr93@i.ua'
    }
    sendGet ("db/api/user/listPosts/", data);
}
//19) unfollow - post
function userUnfollow() {
    var data = {
        'follower': 'svr93@i.ua',
        'followee': 'svr93@i.ua',
    }
    sendPost ("db/api/user/unfollow/", data);
}
//20) updateProfile - post
function userUpdateProfile() {
    var data = {
        'about': 'Im superuser', 
        'name': 'Name2', 
        'user': 'svr93@i.ua'
    }
    sendPost ("db/api/user/updateProfile/", data);
}
//Thread
//21) close - post
function threadClose() {
    var data = {
        'thread': 1,
    }
    sendPost ("db/api/thread/close/", data);
}
//22) create - post
function threadCreate() {
    var data = {
        'forum': 'forum1',
        'title': 'Title1',
        'isClosed': false,
        'user': 'svr93@i.ua',
        'date': '2014-01-01 00:00:00',
        'message': 'Message1',
        'slug': 'slug1',
        'isDeleted': false //optional
    }
    sendPost ("db/api/thread/create/", data);
}
//23) details - get
function threadDetails() {
    var data = {
        'related': ['user', 'forum'], //optional
        'thread': 10
    }
    sendGet ("db/api/thread/details/", data);
}
//24) list - get
function threadList() {
    var data = {
        'since': '2000-01-01 00:00:00', //optional
        'limit': 3, //optional
        'order': 'asc', //optional
        'user': 'svr93@i.ua'
    }
    sendGet ("db/api/thread/list/", data);
}
//25) listPosts - get
function threadListPosts() {
    var data = {
        'since': '2000-01-01 00:00:00', //optional
        'limit': 3, //optional
        'order': 'asc', //optional
        'thread': 3
    }
    sendGet ("db/api/thread/listPosts/", data);
}
//26) open - post
function threadOpen() {
    var data = {
        'thread': 3,
    }
    sendPost ("db/api/thread/open/", data);
}
//27) remove - post
function threadRemove() {
    var data = {
        'thread': 10
    }
    sendPost ("db/api/thread/remove/", data);
}
//28) restore - post
function threadRestore() {
    var data = {
        'thread': 10
    }
    sendPost ("db/api/thread/restore/", data);
}
//29) subscribe - post
function threadSubscribe() {
    var data = {
        'user': 'svr93@i.ua',
        'thread': 10
    }
    sendPost ("db/api/thread/subscribe/", data);
}
//30) unsubscribe - post
function threadUnsubscribe() {
    var data = {
        'user': 'svr93@i.ua',
        'thread': 10
    }
    sendPost ("db/api/thread/unsubscribe/", data);
}
//31) update - post
function threadUpdate() {
    var data = {
        'thread': 10,
        'message': 'Message2',
        'slug': 'slug2'
    }
    sendPost ("db/api/thread/update/", data);
}
//32) vote - post
function threadVote() {
    var data = {
        'thread': 10,
        'vote': -1
    }
    sendPost ("db/api/thread/vote/", data);
}
//clear
function clearDatabase() {
    var data = {}
    sendPost ("db/api/clear/", data);
}
//
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
    xhr.onreadystatechange = function() {
       if (xhr.readyState == 4 && xhr.status == 200) {
           console.log(this.response);
       }
    }			
    xhr.open('GET', url + params, true);
    xhr.send();
}

function sendPost (url, data) {
    data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
       if (xhr.readyState == 4 && xhr.status == 200) {
           console.log(this.response);
       }
    }			
    xhr.open('POST', url, true);
    xhr.send(data);
}

