//*//*//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {    
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    check();

    function check() {
        var follower_id = "";
        var followee_id = "";
 
        if (data.follower != data.followee) {
            connection.query('SELECT id, email FROM User WHERE email \
            IN (?, ?)', [data.follower, data.followee],
            function (err, results) {
                if (err || results.length < 2) {
                    sendError(err);
                } else if ((results[0])['email'] == data.follower) {
                    follower_id = (results[0])['id'];
                    followee_id = (results[1])['id'];
                } else {
                    follower_id = (results[1])['id'];
                    followee_id = (results[0])['id'];
                }
                selectFollowing(follower_id, followee_id);
            });
        } else {
            connection.queryRow('SELECT id FROM User WHERE email=?',
            [data.follower],
            function (err, row) {
                if (err || row === false) {
                    sendError(err);
                } else {
                    follower_id = row['id'];
                    followee_id = row['id'];
                }
                selectFollowing(follower_id, followee_id);
            });
        }
    }
    function selectFollowing(follower_id, followee_id) {
        connection.queryRow('SELECT * FROM Followers \
        WHERE follower_id=? AND target_id=?',
        [follower_id, followee_id], function(err, row) {
            if (err) {
                sendError(err);
            } else if (row !== false) {
                del(follower_id, followee_id);
            } else {
                selectUser(follower_id);
            }
        });
    }
    
    function del(follower_id, followee_id) {
        connection.query('DELETE FROM Followers WHERE \
        follower_id=? AND target_id=?', [follower_id, followee_id], 
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectUser(follower_id);
            }
        });
    }

    function selectUser(follower_id) {
        connection.queryRow('SELECT * FROM User WHERE id=?',
        [follower_id], function (err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError(err);
            } else {
                var extraUserInfoArr = 
                ['followers', 'following', 'subscriptions'];

                getMoreUserInfo(row, extraUserInfoArr, 
                extraUserInfoArr.pop());
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
                    sendError(err);
                } else {
                    user[key] = arr;
                    getMoreUserInfo(user, extraUserInfoArr,
                    extraUserInfoArr.pop());
                }
            });
        }
    }                
          
    function send(results) {
        var response = {
            code: 0,
            response: results
        }
        client.context.data = response;
        callback();
    }

    function sendError(err) {
        var response = {
            code: 1,
            message: 'Error!',
            info: err
        } 
        client.context.data = response;
        callback();
    }
}

