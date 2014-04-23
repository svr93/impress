module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    var connection = impress.conn;

    vote();

    function vote() {

        var userQuery = "";
        if (data.vote == 1) {
            userQuery = 'UPDATE Postrating \
            SET likes=likes+1, points=points+1 WHERE id=' + data.post;
        } else {
            userQuery = 'UPDATE Postrating \
            SET dislikes=dislikes+1, points=points-1 WHERE id=' + data.post;
        }   
        
        connection.query(userQuery, [], function (err, results) {
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

