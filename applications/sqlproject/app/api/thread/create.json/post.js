module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    if (!data.isDeleted) {
        data.isDeleted = false;
    }

    var connection = impress.conn;    
    check();

    function check() {
        connection.queryRow('SELECT *, COUNT(*) FROM Thread\
        WHERE forum=? AND slug=?', [data.forum, data.slug],
        function(err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError;
            } else if (row['COUNT(*)'] == 1) {
                send(row);
            } else {
                insert();
            }
        });
    }

    function insert() {
        connection.insert('Thread', {
	    forum: data.forum,
            isClosed: data.isClosed,
            isDeleted: data.isDeleted,
            message: data.message,
            slug: data.slug,
            title: data.title,
            user: data.user,
            date: data.date,           
        }, function(err, results) {
            console.dir({insert:results});
            if (err) {
                sendError();
            } else {
                selectMaxId();
            }
        });
    }

    function selectMaxId() {
        connection.queryRow('SELECT MAX(id) FROM Thread', [],
        function(err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError();
            } else {
                selectThread(row);
            }
        });
    }

    function selectThread(row) {
        connection.queryRow('SELECT * FROM Thread WHERE id=?',
        [row['MAX(id)']],
        function(err, row) {
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
            response: {
                date: row['date'],
                forum: row['forum'],
                id: row['id'],
                isClosed: row['isClosed'],
                isDeleted: row['isDeleted'],
                message: row['message'],
                slug: row['slug'],
                title: row['title'],
                user: row['user']
            }
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

