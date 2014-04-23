module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    var connection = impress.conn;

    remove();

    function remove() {
        
        connection.query('UPDATE Post SET isDeleted=true WHERE id=?',
        [data.post], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError();
            } else {
                connection.queryValue('SELECT id FROM Post WHERE id=?',
                [data.post], function (err, value) {
                    console.dir({queryValue:value});
                    if (err) {
                        sendError();
                    } else {
                        send(value);
                    }
                });
            }
        });
    }
      
    function send(value) {
        var response = {
            code: 0,
            response: {
                'post': value
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

