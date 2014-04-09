module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var code = 0;
    var connection = impress.conn;
    if (!data['isAnonymous']) {
        data['isAnonymous'] = false;
    }

    connection.insert('User', {
            username: data.username,
            about: data.about,
            name: data.name,
            email: data.email,
            isAnonymous: data.isAnonymous,
        }, function(err, results) {
            console.dir({insert:results, err:err});
            if (err !== null) code = 1;
            select();
    });

    function select() {
        connection.queryRow('SELECT MAX(id) FROM User', [], function(err, row) {
            console.dir({queryRow:row});
            if (err !== null) code = 1;
            connection.queryRow('SELECT * FROM User where id=?', [row['MAX(id)']], 
            function(err, row) {
                console.dir({queryRow:row});
                if (err !== null) code = 1;
                send(row);
            });
        });
    }

    function send(row) {
        var response;
        if (code == 0) {
            response = {
                code: code,
                response: {
                    about: row['about'],
                    email: row['email'],
                    id: row['id'],
                    isAnonymous: row['isAnonymous'],
                    name: row['name'],
                    username: row['username']                             
                }
            }
        } else {
            response = {
                code: code,
                message: 'Error!'
            }
        }
        client.context.data = JSON.stringify(response);
        callback();
    }
}

