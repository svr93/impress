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
            console.dir({queryRow:row});
            if (err) {
                sendError();
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
            console.dir({insert:results});
            if (err) {
                sendError();
            } else {
                selectMaxId();
            }
        });
    }

    function selectMaxId() {
        connection.queryValue('SELECT MAX(id) FROM User', [],
        function(err, value) {
            console.dir({queryValue:value});
            if (err) {
                sendError();
            } else {
                selectUser(value);
            }
        });
    }

    function selectUser(id) {
        connection.queryRow('SELECT * FROM User WHERE id=?',
        [id], function(err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError();
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

    function sendError() {
        var response = {
            code: 1,
            message: 'Error!'
        } 
        client.context.data = JSON.stringify(response);
        callback();
    }
}

