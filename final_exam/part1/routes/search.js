var express = require('express');
var router = express.Router();

router.post('/text', function(req, res, next) {
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT rooms.room_id, rooms.room_name, rooms.room_floor, room_types.room_description, room_types.price FROM rooms INNER JOIN room_types ON rooms.room_type = room_types.room_id WHERE room_types.room_description LIKE ? OR rooms.room_name LIKE ?";
        var searchstring = "%" + req.body.searchstring + "%";
        connection.query(query,[searchstring, searchstring], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
        res.json(rows);
        });
    });
});

router.post('/date', function(req, res, next) {
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT DISTINCT rooms.room_id, rooms.room_name, rooms.room_floor, room_types.room_description, room_types.price FROM rooms INNER JOIN room_types ON rooms.room_type = room_types.room_id LEFT JOIN bookings ON rooms.room_id = bookings.room_id WHERE (NOT(bookings.start_date < ? AND bookings.end_date > ?)) OR bookings.start_date IS NULL";
        connection.query(query, [req.body.end_date, req.body.start_date], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
        res.json(rows);
        });
    });
});

module.exports = router;
