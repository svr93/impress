//*//*//also available:
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
            userQuery = 'UPDATE Threadrating \
            SET likes=likes+1 WHERE id=' + data.thread;
        } else {
            userQuery = 'UPDATE Threadrating \
            SET dislikes=dislikes+1 WHERE id=' + data.thread;
        }   
        
        connection.query(userQuery, [], function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectThread();
            }
        });
    }

    function selectThread() {
        connection.queryRow('SELECT * FROM Thread INNER JOIN Threadrating \
        ON Thread.id=Threadrating.id WHERE Thread.id=?',
        [data.thread], function (err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError(err);
            } else {
                row.points = row.likes - row.dislikes;
                connection.queryValue('SELECT COUNT(*) FROM \
                Post WHERE thread=?', [data.thread],
                function(err, value) {
                    if (err || row === false) {
                        sendError(err);
                    } else {
                        row['posts'] = value;
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
