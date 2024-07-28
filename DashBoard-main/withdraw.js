// withdrawButton.addEventListener('click', () => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userRef = ref(database, 'users/' + user.uid);
//           const snapshot = await get(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.val();
//             const referrals = userData.referrals || 0;
//             const balance = referrals * 500;
  
//             if (balance > 0) {
//               // Make a withdrawal request to the server
//               const response = await fetch('/withdraw', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                   amount: balance,
//                   recipient: {
//                     name: `${userData.firstName} ${userData.lastName}`,
//                     account_number: userData.account_number, // Get these details from user data
//                     bank_code: userData.bank_code // Get these details from user data
//                   }
//                 })
//               });
  
//               const result = await response.json();
  
//               if (response.ok) {
//                 // Reset referrals to zero after successful withdrawal
//                 await update(userRef, { referrals: 0 });
//                 alert(`Withdrawal successful. Amount: NGN ${balance}`);
//                 referralCountElement.textContent = `Referrals: 0`;
//                 balanceElement.textContent = `Balance: NGN 0`;
//               } else {
//                 alert(`Withdrawal failed: ${result.message}`);
//               }
//             } else {
//               alert('No balance to withdraw.');
//             }
//           } else {
//             console.log('No user data found.');
//           }
//         } catch (error) {
//           console.error('Error processing withdrawal:', error);
//         }
//       } else {
//         console.log('No user is signed in.');
//       }
//     });
//   });
  