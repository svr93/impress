module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    var connection = impress.conn;

    update();

    function update() {
        
        connection.query('UPDATE Post SET message=? WHERE id=?',
        [data.message, data.post], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError();
            } else {
                connection.queryRow('SELECT * FROM Post \
                LEFT OUTER JOIN Postrating \
                ON Post.id=Postrating.id WHERE Post.id=?',
                [data.post], function (err, row) {
                    console.dir({queryRow:row});
                    if (err) {
                        sendError();
                    } else {
                        send(row);
                    }
                });
            }
        });
    }
      
    function send(row) {
        var response = {
            code: 0,
            response: row
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

