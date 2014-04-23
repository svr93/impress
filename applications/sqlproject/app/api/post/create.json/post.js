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
        connection.query('INSERT INTO Post (date, forum, parent, \
        isApproved, isDeleted, isEdited, isHighlighted, isSpam, \
        message, thread, user) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            data.date,
            data.forum,
            data.parent,
            data.isApproved,
            data.isDeleted,
            data.isEdited,
            data.isHighlighted,
            data.isSpam,
            data.message,
            data.thread,
            data.user
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
        connection.queryRow('SELECT MAX(id) FROM Post', [],
        function(err, row) {
            console.dir({queryRow:row});
            if (err) {
                sendError();
            } else {
                startRating(row['MAX(id)']);
            }
        });
    }

    function startRating(id) {
        connection.query('INSERT INTO Postrating (id) VALUES (?)', [id],
        function (err, results) {
            console.dir({insert:results});
            if (err) {
                sendError();
            } else {
                selectPost(id);
            }
        });
    }

    function selectPost(id) {
        connection.queryRow('SELECT * FROM Post WHERE id=?',
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
        client.context.data = response;
        callback();
    }

    function sendError() {
        var response = {
            code: 1,
            message: 'Error!'
        } 
        client.context.data = response;
        callback();
    }
}

