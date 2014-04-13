module.exports = function(client, callback) {

    var data = JSON.parse(client.data);
    if (!data.parent) {
        data.parent = null;
    }
    if (!data.isApproved) {
        data.isApproved = false;
    }
    if (!data.isHighlighted) {
        data.isHighlighted = false;
    }
    if (!data.isEdited) {
        data.isEdited = false;
    }
    if (!data.isSpam) {
        data.isSpam = false;
    }
    if (!data.isDeleted) {
        data.isDeleted = false;
    }

    var connection = impress.conn;    
    insert();

    function insert() {
        connection.insert('Post', {
            date: data.date,
            forum: data.forum,
            parent: data.parent,
            isApproved: data.isApproved,
            isDeleted: data.isDeleted,
            isEdited: data.isEdited,
            isHighlighted: data.isHighlighted,
            isSpam: data.isSpam,
            message: data.message,
            thread: data.thread,
            user: data.user
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
        connection.queryRow('SELECT MAX(id) FROM Post', [],
        function(err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError();
            } else {
                selectPost(row);
            }
        });
    }

    function selectPost(row) {
        connection.queryRow('SELECT * FROM Post WHERE id=?',
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
                isApproved: row['isApproved'],
                isDeleted: row['isDeleted'],
                isEdited: row['isEdited'],
                isHighlighted: row['isHighlighted'],
                isSpam: row['isSpam'],
                message: row['message'],
                thread: row['thread'],
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

