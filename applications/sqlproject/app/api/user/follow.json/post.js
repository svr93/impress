module.exports = function(client, callback) {
    
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    follow();

    function follow() {
        connection.query('SELECT id, email FROM User WHERE email \
        IN (?, ?)', [data.follower, data.followee],
        function (err, results) {
            if (err || results.length == 0) {
                sendError();
            } else {
                var follower_id = "";
                var followee_id = "";
                if (data.follower == data.followee) {
                    follower_id = (results[0])['id'];
                    followee_id = (results[0])['id'];
                } else if (results.length == 1) {
                    sendError();
                } else if ((results[0])['email'] == data.follower) {
                    follower_id = (results[0])['id'];
                    followee_id = (results[1])['id'];
                } else {
                    follower_id = (results[1])['id'];
                    followee_id = (results[0])['id'];
                }
                connection.queryRow('SELECT * FROM Followers \
                WHERE follower_id=? AND target_id=?',
                [follower_id, followee_id], function(err, row) {
                    if (err) {
                        sendError();
                    } else if (row === false) {
                        connection.query('INSERT INTO Followers \
                        (follower_id, target_id) VALUES (?, ?)',
                        [follower_id, followee_id], 
                        function (err, results) {
                            if (err) {
                                sendError();
                            } else {
                                selectUser();
                            }
                        });
                    } else {
                        selectUser();
                    }
                });
            }
        });
    }

    function getMoreUserInfo(user, extraUserInfoArr, key) {
        if (key === undefined) {
            send(user);
        } else {
            var userQuery = "";
            
            if (key == 'followers') {
                userQuery = "SELECT email FROM User INNER JOIN Followers ON \
                User.id=Followers.follower_id WHERE target_id=" + user['id'];
            } else if (key == 'following') {
                userQuery = "SELECT email FROM User INNER JOIN Followers ON \
                User.id=Followers.target_id WHERE follower_id=" + user['id'];
            } else if (key == 'subscriptions') {
                userQuery = "SELECT thread_id FROM Subscribe \
                WHERE user_id=" + user['id'];
            }
            connection.queryCol(userQuery, [], function(err, arr) {
                if (err) {
                    sendError();
                } else {
                    user[key] = arr;
                    getMoreUserInfo(user, extraUserInfoArr,
                    extraUserInfoArr.pop());
                }
            });
        }
    }                
    
    function selectUser() {
        connection.queryRow('SELECT * FROM User WHERE email=?',
        [data.follower], function (err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError();
            } else {
                var extraUserInfoArr = 
                ['followers', 'following', 'subscriptions'];

                getMoreUserInfo(row, extraUserInfoArr, 
                extraUserInfoArr.pop());
            }
        });
    }
      
    function send(results) {
        var response = {
            code: 0,
            response: results
        }
        client.context.data = JSON.stringify(response);
        callback();
    }

    function sendError() {
        var response = {
            code: 1,
            message: 'Error!'
        } 
        client.context.data = JSON.stringify(response);
        callback();
    }
}

