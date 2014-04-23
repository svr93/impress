//also available:
//var connection = client.application.databases.my_project.connection;

//console.dir - только главная информация
//здесь select по MAX(id)
//включена отправка информации об ошибках

module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    if (!data.isDeleted) {
        data.isDeleted = false;
    }
    var connection = impress.conn;

    checkExistence();  
    
    function checkExistence() {
        connection.queryRow('SELECT * FROM Thread WHERE forum=? AND title=?',
        [data.forum, data.title], function (err, row) {
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
        connection.query('INSERT INTO Thread (forum, title, \
        isClosed, user, date, message, slug, isDeleted) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            data.forum,
            data.title,
            data.isClosed,
            data.user,
            data.date,
            data.message,
            data.slug,
            data.isDeleted
        ],
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectMaxId();
            }
        });
    }

    function selectMaxId() {
        connection.queryValue('SELECT MAX(id) FROM Thread', [],
        function(err, value) {
            if (err) {
                sendError(err);
            } else {
                startRating(value);
            }
        });
    }

    function startRating(id) {
        connection.query('INSERT INTO Threadrating (id) VALUES (?)', [id],
        function (err, results) {
            if (err) {
                sendError(err);
            } else {
                selectThread(id);
            }
        });
    }

    function selectThread(id) {
        connection.queryRow('SELECT * FROM Thread WHERE id=?',
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

