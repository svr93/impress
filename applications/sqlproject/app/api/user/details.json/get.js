module.exports = function(client, callback) {

    var connection = impress.conn;

    selectUser();

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
        [client.query['user']], function (err, row) {
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
        client.context.data = response;
        callback();
    }

    function sendError() {
        var response = {
            code: 1,
            message: 'Error!'
        } 
        client.context.data = response;
        callback();
    }
}

