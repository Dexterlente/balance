const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/database.db');

router.get('/', (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ error: "User ID parameter is required" });
    }

    const query = `SELECT balance FROM user_wallet WHERE user_id = ?`;
    db.get(query, [user_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to get balance" });
        }
        
        res.json({ balance: row ? row.balance : 0 });
    });
});

module.exports = router;