module.exports = function(client, callback) {
    var code = 0;
    var connection = impress.conn;
    select();

    function select() {
        connection.queryRow('SELECT * FROM User WHERE email=?', [client.query['user']], function(err, row) {
            console.dir({queryRow:row});
            var userInfo = row;
            if (err !== null) code = 1;

            connection.queryCol('SELECT email FROM Followers AS f INNER JOIN User AS u ON\
            (f.follower_id = u.id) WHERE target_id=?', [userInfo['id']], function(err, arr) {
                console.dir({queryCol:arr});
                var followers_arr = arr;
                if (err !== null) code = 1;

                connection.queryCol('SELECT email FROM Followers AS f INNER JOIN User AS u ON\
                (f.target_id = u.id) WHERE follower_id=?', [userInfo['id']], function(err, arr) {
                    console.dir({queryCol:arr});
                    var following_arr = arr;
                    if (err !== null) code = 1;

                    connection.queryCol('SELECT thread_id FROM Subscribe WHERE user_id=?',
                    [userInfo['id']], function(err, arr) {
                        console.dir({queryCol:arr});
                        var subscribe_arr = arr;
                        if (err !== null) code = 1;
                        send(userInfo, followers_arr, following_arr, subscribe_arr);
                    });
                });
            });
        });
    }

    function send(userInfo, followers_arr, following_arr, subscribe_arr) {
        var response;
        if (code == 0) {
            response = {
                code: code,
                response: {
                    about: userInfo['about'],
                    email: userInfo['email'],
                    followers: followers_arr,
                    following: following_arr,
                    id: userInfo['id'],
                    isAnonymous: userInfo['isAnonymous'],
                    name: userInfo['name'],
                    subscriptions: subscribe_arr,
                    username: userInfo['username']                             
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
}

