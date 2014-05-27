//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    vote();

    function vote() {

        var userQuery = "";
        if (data.vote == 1) {
            userQuery = 'UPDATE Postrating \
            SET likes=likes+1 WHERE id=' + data.post;
        } else {
            userQuery = 'UPDATE Postrating \
            SET dislikes=dislikes+1 WHERE id=' + data.post;
        }   
        
        connection.query(userQuery, [], function (err, results) {
            if (err) {
                sendError(err);
            } else {
                connection.queryRow('SELECT * FROM Post \
                INNER JOIN Postrating \
                ON Post.id=Postrating.id WHERE Post.id=?',
                [data.post], function (err, row) {
                    console.dir({queryRow:row});
                    if (err || row === false) {
                        sendError(err);
                    } else {
                        row.points = row.likes - row.dislikes;
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

