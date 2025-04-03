const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

function insertUserData(db, userData) {
    userData.forEach(user => {
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO users (id, username) VALUES (${user.id}, '${user.username}')`, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`User with ID ${user.id} has been inserted.`);
            });
        });
    });
}

function insertUserWalletData(db, walletData) {
    walletData.forEach(wallet => {
        db.serialize(() => {
            db.run(`INSERT INTO user_wallet (balance, user_id) VALUES (${wallet.balance}, ${wallet.user_id})`, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Initial wallet entry for user ID ${wallet.user_id} has been inserted.`);
            });
        });
    });
}

function updateUserData(db, userData) {
    userData.forEach(user => {
        db.serialize(() => {
            db.run(`UPDATE users SET username = '${user.username}' WHERE id = ${user.id}`, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`User with ID ${user.id} has been updated.`);
            });
        });
    });
}

function updateUserWalletData(db, walletData) {
    walletData.forEach(wallet => {
        db.serialize(() => {
            db.run(`UPDATE user_wallet SET balance = ${wallet.balance} WHERE user_id = ${wallet.user_id}`, function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Wallet entry for user ID ${wallet.user_id} has been updated.`);
            });
        });
    });
}

const updatedUsersData = [
    { username: 'Foo', id: 1 },
    { username: 'Bar', id: 2 },
    { username: 'Baz', id: 3 }
];

const updatedWalletsData = [
    { balance: 15000, user_id: 1 },
    { balance: 20000, user_id: 2 },
    { balance: 25000, user_id: 3 }
];

insertUserData(db, updatedUsersData);
insertUserWalletData(db, updatedWalletsData);
updateUserData(db, updatedUsersData);
updateUserWalletData(db, updatedWalletsData);

db.close();

// RUN THIS TO INSERT MOCK DATA