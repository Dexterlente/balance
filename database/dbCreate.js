const sqlite3 = require('sqlite3').verbose();

function createDatabase() {
    const db = new sqlite3.Database('database/database.db');

    db.serialize(() => {
        db.run("PRAGMA foreign_keys = ON;");

        // Check if 'users' table exists and create it if not
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
            if (err) {
                console.error('Error checking for users table existence:', err.message);
            } else {
                if (!row) {
                    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT)", (createErr) => {
                        if (createErr) {
                            console.error('Error creating users table:', createErr.message);
                        } else {
                            console.log('Users table created successfully');
                        }
                    });
                } else {
                    console.log('Users table already exists');
                }
            }
        });

        // Check if the 'user_wallet' table already exists
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='user_wallet'", (err, row) => {
            if (err) {
                console.error('Error checking for table existence:', err.message);
            } else {
                if (!row) {
                    db.run("CREATE TABLE user_wallet (id INTEGER PRIMARY KEY, balance INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))", (createErr) => {
                        if (createErr) {
                            console.error('Error creating table:', createErr.message);
                        } else {
                            console.log('users_wallet table created successfully');
                        }
                    });
                } else {
                    console.log('users_wallet table already exists');
                }
            }
        });
    });

    return db;
}

module.exports = createDatabase;