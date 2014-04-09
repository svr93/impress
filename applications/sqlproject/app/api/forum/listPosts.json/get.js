module.exports = function(client, callback) {
    var code = 0;
    var connection = impress.conn;
    if (!client.query['order']) {
        client.query['order'] = 'desc';
    }
    if (!client.query['related']) {
        client.query['related'] = '[]';
    }
    selectPosts();
    
    function selectPosts() {
        var since = "";
        if (client.query['since']) {
            since = ' AND date >= ' + client.query['since'];
        }
        var limit = "";
        if (client.query['limit']) {
            limit = ' LIMIT ' + client.query['limit'];
        }
            
        connection.query('SELECT * FROM Post WHERE forum=???', 
        [client.query['forum'], since, limit],
        function (err, results) {
            console.dir({query:results});
            //to be continued...
        });
    }
    /*function selectForum() {
        connection.queryRow('SELECT * FROM Forum WHERE short_name=?', [client.query['forum']],
        function (err, row) {
            console.dir({queryRow:row});
            var forumInfo = row;
            if (err !== null) code = 1;
            if ((client.query['related']).indexOf('user') + 1) {
                selectUser(forumInfo);                
            } else {
                sendLite(forumInfo);
            }
        });
    }

    function selectUser(forumInfo) {
        connection.queryRow('SELECT * FROM User WHERE email=?', [forumInfo.user], 
        function(err, row) {
            console.dir({queryRow:row});
            var userInfo = row;
            if (err !== null) code = 1;

            connection.queryCol('SELECT email FROM Followers AS f INNER JOIN User AS u ON\
            (f.follower_id = u.id) WHERE target_id=?', [userInfo['id']], 
            function(err, arr) {
                console.dir({queryCol:arr});
                var followers_arr = arr;
                if (err !== null) code = 1;

                connection.queryCol('SELECT email FROM Followers AS f INNER JOIN User AS u ON\
                (f.target_id = u.id) WHERE follower_id=?', [userInfo['id']], 
                function(err, arr) {
                    console.dir({queryCol:arr});
                    var following_arr = arr;
                    if (err !== null) code = 1;

                    connection.queryCol('SELECT thread_id FROM Subscribe WHERE user_id=?',
                    [userInfo['id']], function(err, arr) {
                        console.dir({queryCol:arr});
                        var subscribe_arr = arr;
                        if (err !== null) code = 1;
                        send(forumInfo, userInfo, followers_arr, following_arr, subscribe_arr);
                    });
                });
            });
        });
    }

    function send(forumInfo, userInfo, followers_arr, following_arr, subscribe_arr) {
        var response;
        if (code == 0) {
            response = {
                code: code,
                response: {
                    id: forumInfo['id'],
                    name: forumInfo['name'],
                    short_name: forumInfo['short_name'],
                    user: {
		            //about: userInfo['about'],
		            email: userInfo['email'],
		            followers: followers_arr,
		            following: following_arr,
		            id: userInfo['id'],
		            isAnonymous: userInfo['isAnonymous'],
		            name: userInfo['name'],
		            subscriptions: subscribe_arr,
		            //username: userInfo['username']                             
		    }
                }
            }
        } else {
            response = {
                code: code,
                message: 'Error!'
            }
        }
        client.context.data = JSON.stringify(response);
        callback();
    }

    function sendLite(forumInfo) {
        var response;
        if (code == 0) {
            response = {
                code: code,
                response: {
                    id: forumInfo['id'],
                    name: forumInfo['name'],
                    short_name: forumInfo['short_name'],
                    user: forumInfo['user']                          
                }
            }
        } else {
            response = {
                code: code,
                message: 'Error!'
            }
        }
        client.context.data = JSON.stringify(response);
        callback();
    }*/
}

