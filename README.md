## Installation and Usage

### Install Dependencies
Run the following command to install dependencies on root folder for server:
```sh
npm install
```

### Start the Server
Run the following command to start the server:
```sh
npm start
```

This will create an SQLite database file named database.db inside the database folder and run the backend server at port 5000.

Insert Mock Data into SQLite
To populate the SQLite database with mock data, run the following command:
at rootfolder

```sh
node database/dataInsertion.js
```


This repository provides endpoints for the following functionalities:

GET ```http://localhost:5000/balance```
    add params to the endpoint

    /balance?user_id={user_id}

    returns

    {
        "balance": 21000
    }

Retrieves the balance information.


POST http://localhost:5000/cash-in

    Post Payload 
    {
        "user_id": 1,
        "amount": 100
    }

    reponse
    {
        "message": "Balance updated successfully!"
    }
Allows users to deposit cash into their accounts.

POST http://localhost:5000/debit

    Post Payload
    {
        "user_id": 1,
        "amount": 100
    }

    {
        "message": "Debit successful!"
    }
Initiates a debit transaction from the user's account.

GET http://localhost:5000/users

    Response: array of users

    [
        {
            "id": 1,
            "username": "Foo"
        },
        {
            "id": 2,
            "username": "Bar"
        },
        {
            "id": 3,
            "username": "Baz"
        }
    ]

Retrieves information about users.