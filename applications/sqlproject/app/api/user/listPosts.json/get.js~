//also available:
//var connection = client.application.databases.my_project.connection;
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

        var userQuery = 'SELECT * FROM Post LEFT OUTER JOIN Postrating \
        ON Post.id=Postrating.id WHERE user=' + '"' 
        + client.query['user'] + '"' + since + ' ORDER BY date ' + client.query['order'] + limit;

        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError();
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

    function sendError() {
        var response = {
            code: 1,
            message: 'Error!'
        } 
        client.context.data = response;
        callback();
    }
}

