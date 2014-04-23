//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    open();

    function open() {        
        connection.query('UPDATE Thread SET isClosed=false WHERE id=?',
        [data.thread], function (err, results) {
            if (err) {
                sendError(err);
            } else {
                connection.queryValue('SELECT id FROM Thread WHERE id=?',
                [data.thread], function (err, value) {
                    console.dir({queryValue:value});
                    if (err) {
                        sendError(err);
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
                'thread': value
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

