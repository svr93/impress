//*//*//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;
 
    check();

    function check() {
        connection.queryRow('SELECT * FROM User WHERE email=?',
        [data.user], function(err, row) {
            if (err || row === false) {
                sendError(err);
            } else {
                update(row['id']);
            }
        });
    }

    function update(id) {
        connection.query('UPDATE User SET \
        about=?, name=? WHERE id=?', [
            data.about,
            data.name,
            id
        ],
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectUser(id);
            }
        });
    }

    function selectUser(id) {
        connection.queryRow('SELECT * FROM User WHERE id=?',
        [id], function(err, row) {
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

    function send(row) {
        var response = {
            code: 0,
            response: row
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

