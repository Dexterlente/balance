const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/database.db');

router.post('/', (req, res) => {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
        return res.status(400).json({ error: "User ID and balance amount are required in the request body" });
    }

    db.get(`SELECT balance FROM user_wallet WHERE id = ?`, user_id, (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to get balance" });
        }

        if (!row || row.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        db.run(`UPDATE user_wallet SET balance = balance - ? WHERE id = ?`, [amount, user_id], function(err) {
            if (err) {
                return res.status(500).json({ error: "Failed to debit amount" });
            }

            res.json({ message: 'Debit successful!' });
        });
    });
});

module.exports = router;
