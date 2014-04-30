//*//*//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    selectUserId();

    function selectUserId() {
        connection.queryValue('SELECT id FROM User WHERE email=?',
        [data.user], function(err, value) {
            if (err) {
                sendError(err);
            } else {
                check(value);
            }
        });
    }
    
    function check(user_id) {
        connection.queryRow('SELECT * FROM Subscribe WHERE \
        user_id=? AND thread_id=?', [user_id, data.thread], function(err, row) {
            if (err) {
                sendError(err);
            } else if (row !== false) {
                send(row);
            } else {
                subscribe(user_id);
            }
        });
    }

    function subscribe(user_id) {
        connection.query('INSERT INTO Subscribe (user_id, thread_id) \
        VALUES (?, ?)', [user_id, data.thread], function(err, results) {
            if (err) {
                sendError(err);
            } else {
                selectSubscription(user_id);
            }
        });
    }

    function selectSubscription(user_id) {
        connection.queryRow('SELECT * FROM Subscribe WHERE \
        user_id=? AND thread_id=?', [user_id, data.thread],
        function(err, row) {
            if (err) {
                sendError(err);
            } else {
                send(row);
            }
        });
    }
      
    function send(row) {
        var response = {
            code: 0,
            response: {
                'thread': row['thread_id'],
                'user': data.user
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

