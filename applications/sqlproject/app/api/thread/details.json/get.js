//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    if (!client.query['related']) {
        client.query['related'] = '[]';
    }
    var entityArr = ['forum', 'user'];
    var connection = impress.conn;

    selectThread();

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

                    getMoreUserInfo(user, extraUserInfoArr, 
                    extraUserInfoArr.pop(), clbk);
                }
            });
        }
    }                

    function getMoreThreadInfo(results) {
        var param = (results[0])['id'];
        connection.queryValue('SELECT COUNT(*) FROM Post WHERE thread=?', 
        [param], function(err, value) {
            if (err) {
                sendError(err);
            } else {
                (results[0])['posts'] = value;
                getRelated(results, entityArr.pop());
            }
        });        
    }
    
    function getRelated(results, entity) {
        if (entity === undefined) {
            send(results);
        } else if ((client.query['related']).indexOf(entity) == -1) {
            getRelated(results, entityArr.pop());
        } else {
            var userQuery = "";

            if (entity == 'forum') {
                userQuery = 'SELECT * FROM Forum WHERE short_name=?';
            } else if (entity == 'user') {
                userQuery = 'SELECT * FROM User WHERE email=?';
            }

            async.each(results, function(elem, clbk) {
                var param = elem[entity];
                connection.queryRow(userQuery, [param], function(err, row) {
                    if (err) {
                        sendError(err);
                    } else {
                        elem[entity] = row;
                        if (entity == 'user') {
                            var extraUserInfoArr = 
                            ['followers', 'following', 'subscriptions'];

                            getMoreUserInfo(elem[entity], extraUserInfoArr,
                            extraUserInfoArr.pop(), clbk);
                        } else {//if entity == 'forum'
                            clbk();
                        }
                    }
                });
            }, function(err) {
                if (err) {
                    sendError(err);
                }
                getRelated(results, entityArr.pop());
            });
        }
    }

    function selectThread() {
        connection.query('SELECT * FROM Thread INNER JOIN Threadrating \
        ON Thread.id=Threadrating.id WHERE Thread.id=?',
        [client.query['thread']], function (err, results) {
        //получаю массив, а не строку, т.к. использую async.each
            console.dir({query:results});
            if (err || (!results[0])) {
                sendError(err);
            } else {
                results[0].points = results[0].likes - results[0].dislikes;
                getMoreThreadInfo(results);
            }
        });
    }
      
    function send(results) {
        var response = {
            code: 0,
            response: results[0]
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
