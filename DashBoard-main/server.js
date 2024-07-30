const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

// Replace with your Paystack secret key
const PAYSTACK_SECRET_KEY = 'sk_test_your_secret_key';

// Endpoint to handle withdrawal
app.post('/withdraw', async (req, res) => {
    const { userId, amount, bankAccount } = req.body;
    try {
        // 1. Create a transfer recipient
        const recipientResponse = await axios.post('https://api.paystack.co/transferrecipient', {
            type: 'nuban',
            name: 'Recipient Name',
            account_number: bankAccount.number,
            bank_code: bankAccount.bankCode,
            currency: 'NGN'
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const recipientCode = recipientResponse.data.data.recipient_code;

        // 2. Initiate the transfer
        const transferResponse = await axios.post('https://api.paystack.co/transfer', {
            source: 'balance',
            amount: amount * 100, // Convert to kobo
            currency: 'NGN',
            recipient: recipientCode,
            reason: 'Withdrawal'
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ message: 'Transfer initiated successfully', data: transferResponse.data });
    } catch (error) {
        res.status(500).json({ message: 'Error processing transfer', error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
