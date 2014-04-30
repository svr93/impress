//////also available:
//var connection = client.application.databases.my_project.connection;
//insertId используется
//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    if (!data.isAnonymous) {
        data.isAnonymous = false;
    }
    
    var connection = impress.conn;    
    check();

    function check() {
        connection.queryRow('SELECT * FROM User WHERE email=?',
        [data.email], function(err, row) {
            if (err) {
                sendError(err);
            } else if (row === false) {
                insert();             
            } else {
                send(row);
            }
        });
    }

    function insert() {
        connection.query('INSERT INTO User (isAnonymous, username, about, \
        name, email) \
        VALUES (?, ?, ?, ?, ?)', [
            data.isAnonymous,
            data.username,
            data.about,
            data.name,
            data.email
        ],
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectUser(results['insertId']);
            }
        });
    }

    function selectUser(id) {
        connection.queryRow('SELECT * FROM User WHERE id=?',
        [id], function(err, row) {
            console.dir({queryRow:row});
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

