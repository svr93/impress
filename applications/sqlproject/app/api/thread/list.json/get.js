//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    if (!client.query['order']) {
        client.query['order'] = 'desc';
    }
    var connection = impress.conn;

    selectThreads();

    function selectThreads() {
        var since = "";
        if (client.query['since']) {
            since = ' AND date >= ' + '"' + client.query['since'] + '"';
        }
        var limit = "";
        if (client.query['limit']) {
            limit = ' LIMIT ' + client.query['limit'];
        }

        var userQuery = "";

        if(!client.query['user']) {
            userQuery = 'SELECT * FROM Thread INNER JOIN Threadrating \
            ON Thread.id=Threadrating.id WHERE forum=' + '"' 
            + client.query['forum'] + '"' + since + ' ORDER BY date ' 
            + client.query['order'] + limit;
        } else {
            userQuery = 'SELECT * FROM Thread INNER JOIN Threadrating \
            ON Thread.id=Threadrating.id WHERE user=' + '"' 
            + client.query['user'] + '"' + since + ' ORDER BY date ' 
            + client.query['order'] + limit;
        }

        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError(err);
            } else {
                async.each(results, function(elem, clbk) {
                    connection.queryValue('SELECT COUNT(*) FROM Post WHERE thread=?', 
                    [elem['id']], function(err, value) {
                        if (err) {
                            sendError(err);
                        } else {
                            elem['posts'] = value;
                            clbk();
                        }
                    });
                }, function(err) {
                    if (err) {
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

