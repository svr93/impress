module.exports = function(client, callback) {
    var data = JSON.parse(client.data);
    var code = 0;
    var connection = impress.conn;

    connection.insert('Forum', {
            name: data.name,
            short_name: data.short_name,
            user: data.user,
        }, function(err, results) {
            console.dir({insert:results, err:err});
            if (err !== null) code = 1;
            select();
    });

    function select() {
        connection.queryRow('SELECT MAX(id) FROM Forum', [], function(err, row) {
            console.dir({queryRow:row});
            if (err !== null) code = 1;
            connection.queryRow('SELECT * FROM Forum where id=?', [row['MAX(id)']], 
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
                    id: row['id'],
                    name: row['name'],
                    short_name: row['short_name'],
                    user: row['user'],                            
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

