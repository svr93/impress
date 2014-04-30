//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    if (!client.query['order']) {
        client.query['order'] = 'desc';
    }
    var connection = impress.conn;

    selectUsers();

    function getMoreUserInfo(user, extraUserInfoArr, key, clbk) {
        if (key === undefined) {
            clbk();
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
                    getMoreUserInfo(user, extraUserInfoArr, extraUserInfoArr.pop(), clbk);
                }
            });
        }
    }

    function selectUsers() {
        var since_id = "";
        if (client.query['since_id']) {
            since_id = ' AND id >= ' + client.query['since_id'];
        }
        var limit = "";
        if (client.query['limit']) {
            limit = ' LIMIT ' + client.query['limit'];
        }

        var userQuery = 'SELECT * FROM User WHERE email IN ( \
        SELECT user FROM Post WHERE forum=' + '"' 
        + client.query['forum'] + '")' + since_id + ' ORDER BY id ' 
        + client.query['order'] + limit;

        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError(err);
            } else {
                var extraUserInfoArr = ['followers', 'following', 'subscriptions'];

                async.each(results, function(elem, clbk) {
                    getMoreUserInfo(elem, extraUserInfoArr, 
                    extraUserInfoArr.pop(), clbk);
                }, function(e) {
                    if (e) {
                        sendError(err);
                    }
                    send(results);
                });
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

