module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    var connection = impress.conn;

    vote();

    function vote() {

        var userQuery = "";
        if (data.vote == 1) {
            userQuery = 'UPDATE Threadrating \
            SET likes=likes+1, points=points+1 WHERE id=' + data.thread;
        } else {
            userQuery = 'UPDATE Threadrating \
            SET dislikes=dislikes+1, points=points-1 WHERE id=' + data.thread;
        }   
        
        connection.query(userQuery, [], function (err, results) {
            console.dir({query:results});
            if (err) {
                sendError();
            } else {
                connection.queryRow('SELECT * FROM Thread \
                LEFT OUTER JOIN Threadrating \
                ON Thread.id=Threadrating.id WHERE Thread.id=?',
                [data.thread], function (err, row) {
                    console.dir({queryRow:row});
                    if (err) {
                        sendError();
                    } else {
                        connection.queryValue('SELECT COUNT(*) FROM \
                        Post WHERE thread=?', [data.thread],
                        function(err, value) {
                            if (err) {
                                sendError();
                            } else {
                                row['posts'] = value;
                                send(row);
                            }
                        });
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

