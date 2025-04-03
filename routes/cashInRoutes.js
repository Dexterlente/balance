const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/database.db');

router.post('/', (req, res) => {
    const { user_id, amount } = req.body;

    if (user_id && amount) {
        // Check if the user with the provided user_id exists
        db.get('SELECT balance FROM user_wallet WHERE id = ?', user_id, (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Database error while checking for user" });
            }

            if (row) {
                const updatedBalance = row.balance + amount;
                // Update the balance for the existing user
                db.run('UPDATE user_wallet SET balance = ? WHERE id = ?', [updatedBalance, user_id], function(err) {
                    if (err) {
                        return res.status(500).json({ error: "Failed to update balance" });
                    }

                    res.json({ message: 'Balance updated successfully!' });
                });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        });
    } else {
        res.status(400).json({ error: "User ID and new balance are required in the request body" });
    }
});

module.exports = router;
