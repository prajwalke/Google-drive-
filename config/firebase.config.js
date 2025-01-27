const admin = require('firebase-admin');
const serviceAccount = require('../drive-de171-firebase-adminsdk-fbsvc-ce0eb62628.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'drive-de171.appspot.com' // Update with your Firebase Storage bucket name
});

module.exports = admin;