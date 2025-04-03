const express = require('express');
const cors = require('cors');
const app = express();
const balanceRoutes = require('./routes/balanceRoutes');
const cashInRoutes = require('./routes/cashInRoutes');
const debitRoutes = require('./routes/debitRoutes');
const userRoutes = require('./routes/userRoutes');
const createDatabase = require('./database/dbCreate');

const db = createDatabase();
app.use(cors()); 

app.use(express.json()); 
app.use(express.static('public'));

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/balance', balanceRoutes);
app.use('/cash-in', cashInRoutes);
app.use('/debit', debitRoutes);
app.use('/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});