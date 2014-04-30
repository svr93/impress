//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    if (!client.query['order']) {
        client.query['order'] = 'desc';
    }
    if (!client.query['related']) {
        client.query['related'] = '[]';
    }
    var entityArr = ['thread', 'forum', 'user'];
    var connection = impress.conn;

    selectPosts();

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

    function getMoreThreadInfo(thread, clbk) {
        var param = thread['id'];
        connection.queryRow('SELECT COUNT(*) FROM Post WHERE thread=?', [param], function(err, row) {
            if (err) {
                sendError(err);
            } else {
                thread['posts'] = row['COUNT(*)'];
                clbk();
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

            if (entity == 'thread') {
                userQuery = 'SELECT * FROM Thread INNER JOIN Threadrating \
                ON Thread.id=Threadrating.id WHERE Thread.id=?';
            } else if (entity == 'forum') {
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
                        if (entity == 'thread') {
                            getMoreThreadInfo(elem[entity], clbk);
                        } else if (entity == 'user') {
                            var extraUserInfoArr = ['followers', 'following', 'subscriptions'];
                            getMoreUserInfo(elem[entity], extraUserInfoArr, extraUserInfoArr.pop(), clbk);
                        } else {
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

    function selectPosts() {
        var since = "";
        if (client.query['since']) {
            since = ' AND date >= ' + '"' + client.query['since'] + '"';
        }
        var limit = "";
        if (client.query['limit']) {
            limit = ' LIMIT ' + client.query['limit'];
        }

        var userQuery = 'SELECT * FROM Post INNER JOIN Postrating \
        ON Post.id=Postrating.id WHERE forum=' + '"' 
        + client.query['forum'] + '"' + since + ' ORDER BY date ' + client.query['order'] + limit;

        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError(err);
            } else {
                getRelated(results, entityArr.pop());
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

