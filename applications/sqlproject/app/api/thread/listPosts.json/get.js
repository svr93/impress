//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    if (!client.query['order']) {
        client.query['order'] = 'desc';
    }
    var connection = impress.conn;

    selectPosts();

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
        ON Post.id=Postrating.id WHERE thread=' + '"' 
        + client.query['thread'] + '"' + since + ' ORDER BY date '
        + client.query['order'] + limit;

        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError(err);
            } else {
                send(results);
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

