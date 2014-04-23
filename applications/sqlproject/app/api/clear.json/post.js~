////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var truncateTableArr = ['User', 'Forum', 'Thread', 'Post', 'Followers', 'Postrating', 'Threadrating', 'Subscribe'];
    var connection = impress.conn;

    clear(0);
    
    function truncateTable(table) {
        if (table !== undefined) {
            var userQuery = 'TRUNCATE TABLE ' + table;
            connection.query(userQuery, [], function(err, results) {
                if (err) {
                    sendError(err);
                } else {
                    console.dir({query:results});
                    truncateTable(truncateTableArr.pop());
                }
            });
        } else {
            clear(1);
        }
    }

    function clear(value) {
        connection.query('SET FOREIGN_KEY_CHECKS = ?', [value], function(err, results) {
            if (err) {
                sendError(err);
            } else if (value === 1) {
                send();
            } else {
                truncateTable(truncateTableArr.pop());
            }
        });
    }

    function send() {
        var response = {
            code: 0,
            response: 'OK'
        }
        client.context.data = JSON.stringify(response);
        callback();
    }

    function sendError(err) {
        var response = {
            code: 1,
            message: 'Error!',
            info: err
        } 
        client.context.data = JSON.stringify(response);
        callback();
    }
}

