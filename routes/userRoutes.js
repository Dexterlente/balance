const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/database.db');

router.get('/', (req, res) => {
    db.all('SELECT id, username FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve users from the database" });
        }
        res.json(rows);
    });
});

module.exports = router;