//*//*//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    update();

    function update() {       
        connection.query('UPDATE Thread SET message=?, slug=? WHERE id=?',
        [data.message, data.slug, data.thread], function (err, results) {
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

