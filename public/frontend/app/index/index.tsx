'use client'
import React, { useState, useEffect } from 'react';
import handleCashIn from './cashInUtils';
import handleDebit from './debitUtils'

interface User {
    id: number;
    username: string;
}

interface BalanceResponse {
    balance: number;
}

const Index: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [cashInAmount, setCashInAmount] = useState<number | null>(null);
    const [debitAmount, setDebitInAmount] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/users');
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelect = (userId: number) => {
        const selected = users.find((user) => user.id === userId);
        setSelectedUser(selected || null);
        setBalance(null);
    };

    const handleGetBalance = async () => {
        if (!selectedUser) {
            console.error('No user selected');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/balance?user_id=${selectedUser.id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch balance data');
            }
            const data: BalanceResponse = await res.json();
            setBalance(data.balance);
        } catch (error) {
            console.error('Error fetching balance data:', error);
        }
    };

    const handleCashInOperation = async () => {
        if (!selectedUser || cashInAmount === null || cashInAmount <= 0) {
            console.error('Please select a user and enter a valid cash-in amount');
            return;
        }
    
        await handleCashIn({ user_id: selectedUser.id, amount: cashInAmount });
    
        handleGetBalance();
    };

    const handleDebitOperation = async () => {
        if (!selectedUser || debitAmount === null || debitAmount <= 0) {
            console.error('Please select a user and enter a valid debit amount');
            return;
        }
    
        await handleDebit({ user_id: selectedUser.id, amount: debitAmount });
    
        handleGetBalance();
    };
    
    

    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">User Data</h1>
            <select
                onChange={(e) => handleUserSelect(Number(e.target.value))}
                className="p-2 mt-2 border rounded-md"
            >
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </select>

            {selectedUser && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">User Details</h2>
                    <p>ID: {selectedUser.id}</p>
                    <p>Username: {selectedUser.username}</p>
                </div>
            )}

            {selectedUser && (
                <button
                    onClick={handleGetBalance}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Get Balance
                </button>
            )}

            {balance !== null && selectedUser && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">User Balance</h2>
                    <p>Balance: {balance}</p>
                </div>
            )}

            {selectedUser && (
                <div className="mt-4">
                    <input
                        type="number"
                        value={cashInAmount || ''}
                        onChange={(e) => setCashInAmount(Number(e.target.value))}
                        placeholder="Enter amount to cash in"
                        className="p-2 border rounded-md"
                    />
                    <button
                         onClick={async () => {
                            await handleCashInOperation();
                            setCashInAmount(null);
                        }}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Cash In
                    </button>
                </div>
            )}

            {selectedUser && (
                <div className="mt-4">
                    <input
                        type="number"
                        value={debitAmount || ''}
                        onChange={(e) => setDebitInAmount(Number(e.target.value))}
                        placeholder="Enter amount to debit"
                        className="p-2 border rounded-md"
                    />
                    <button
                         onClick={async () => {
                            await handleDebitOperation();
                            setDebitInAmount(null);
                        }}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        debit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Index;
