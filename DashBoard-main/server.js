const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Paystack secret key
const PAYSTACK_SECRET_KEY = 'pk_live_ab995f451253aaca1a9c05a5698e4637326eb0df';

app.use(bodyParser.json());

// Endpoint to handle withdrawal requests
app.post('/withdraw', async (req, res) => {
    const { userId, amount, recipientAccountNumber, recipientBankCode } = req.body;

    try {
        // Step 1: Create a transfer recipient
        const recipientResponse = await axios.post('https://api.paystack.co/transferrecipient', {
            type: 'nuban',
            name: 'User Name', // Replace with the actual user's name
            account_number: recipientAccountNumber,
            bank_code: recipientBankCode,
            currency: 'NGN'
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });

        const recipientCode = recipientResponse.data.data.recipient_code;

        // Step 2: Initiate the transfer
        const transferResponse = await axios.post('https://api.paystack.co/transfer', {
            source: 'balance',
            amount: amount * 100, // Convert to kobo
            recipient: recipientCode,
            reason: 'Affiliate earnings withdrawal'
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });

        res.json({
            success: true,
            message: 'Withdrawal successful',
            data: transferResponse.data
        });
    } catch (error) {
        console.error('Error initiating withdrawal:', error);
        res.status(500).json({
            success: false,
            message: 'Withdrawal failed. Please try again later.',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
