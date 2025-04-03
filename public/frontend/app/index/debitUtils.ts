interface DebitPayload {
    user_id: number;
    amount: number;
}

const handleDebit = async (payload: DebitPayload): Promise<void> => {
    try {
        const res = await fetch('http://localhost:5000/debit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error('Failed to cash in');
        }

        console.log('Debit successful');
    } catch (error) {
        console.error('Error during debit:', error);
    }
};

export default handleDebit;
