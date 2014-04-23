////also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var connection = impress.conn;

    checkExistence();  
    
    function checkExistence() {
        connection.queryRow('SELECT * FROM Forum WHERE name=?',
        [data.name], function (err, row) {
            if (err) {
                sendError(err);
            } else if (row !== false) {
                send(row);
            } else {
                insert();
            }
        });
    }

    function insert() {
        connection.query('INSERT INTO Forum (name, short_name, user) \
        VALUES (?, ?, ?)', [
            data.name,
            data.short_name,
            data.user
        ],
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectForum();
            }
        });
    }

    function selectForum() {
        connection.queryRow('SELECT * FROM Forum WHERE name=?',
        [data.name], function(err, row) {
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

