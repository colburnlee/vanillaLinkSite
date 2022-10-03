const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


// Get the latest round data from the RTDB and return it to the client
// exports.getLatestRoundData = functions.https.onRequest(async (req, res) => {
//   const db = admin.database();
//   const ref = db.ref("oracles/ETH_ETHUSD/latestRound");
//   const snapshot = await ref.once("value");
//   res.send(snapshot.val());
// }
