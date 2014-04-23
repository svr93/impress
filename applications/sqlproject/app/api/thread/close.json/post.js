//also available:
//var connection = client.application.databases.my_project.connection;
module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    close();

    function close() {
        
        connection.query('UPDATE Thread SET isClosed=true WHERE id=?',
        [data.thread], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError();
            } else {
                connection.queryRow('SELECT id FROM Thread WHERE id=?',
                [data.thread], function (err, row) {
                    console.dir({queryRow:row});
                    if (err || row === false) {
                        sendError();
                    } else {
                        send(row['id']);
                    }
                });
            }
        });
    }
      
    function send(value) {
        var response = {
            code: 0,
            response: {
                'thread': value
            }
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

