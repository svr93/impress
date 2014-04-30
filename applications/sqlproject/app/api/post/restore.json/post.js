//////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    restore();

    function restore() {
        
        connection.query('UPDATE Post SET isDeleted=false WHERE id=?',
        [data.post], function (err, results) {
            if (err) {
                sendError(err);
            } else {
                connection.queryRow('SELECT * FROM Post WHERE id=?',
                [data.post], function (err, row) {
                    console.dir({queryRow:row});
                    if (err || row === false) {
                        sendError(err);
                    } else {
                        send(row);
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

