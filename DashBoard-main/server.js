// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const app = express();

// app.use(bodyParser.json());

// const PAYSTACK_SECRET_KEY = 'sk_live_9a828cc76bd581cd5a304f67a2c1fb6f8e279084';

// // Endpoint to handle withdrawal request
// app.post('/withdraw', async (req, res) => {
//   const { amount, recipient } = req.body;

//   try {
//     // Create a transfer recipient
//     const recipientResponse = await axios.post('https://api.paystack.co/transferrecipient', {
//       type: 'nuban',
//       name: recipient.name,
//       account_number: recipient.account_number,
//       bank_code: recipient.bank_code,
//       currency: 'NGN'
//     }, {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
//       }
//     });

//     const recipientCode = recipientResponse.data.data.recipient_code;

//     // Initiate the transfer
//     const transferResponse = await axios.post('https://api.paystack.co/transfer', {
//       source: 'balance',
//       amount: amount * 100, // Paystack amount is in kobo
//       recipient: recipientCode,
//       reason: 'Affiliate withdrawal'
//     }, {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
//       }
//     });

//     res.json({ message: 'Transfer successful', data: transferResponse.data });
//   } catch (error) {
//     res.status(500).json({ message: 'Transfer failed', error: error.response.data });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
