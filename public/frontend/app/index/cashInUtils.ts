interface CashInPayload {
    user_id: number;
    amount: number;
}

const handleCashIn = async (payload: CashInPayload): Promise<void> => {
    try {
        const res = await fetch('http://localhost:5000/cash-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error('Failed to cash in');
        }

        console.log('Cash-in successful');
    } catch (error) {
        console.error('Error during cash-in:', error);
    }
};

export default handleCashIn;
