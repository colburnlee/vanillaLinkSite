const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  console.log("This is the included text at the url end: ", request.query.text);
  // Chain is the first 3 characters of the address
  const chain = request.query.text.slice(0, 3);
  // Address is the rest of the characters
  const address = request.query.text.slice(4);
  // Ask the RTDB for the most recent roundId for the chain/pair
  admin
      .database()
      .ref(`/${chain}/${address}`)
      .orderByChild("roundId")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        // If there is a roundId, return it
        if (snapshot.exists()) {
          const roundId = Object.values(snapshot.val())[0].roundId;
          response.send(`Current ${chain}/${address} RTDB roundId: ${roundId}`);
        } else {
          // If there is no roundId, return an error
          response.send(`No roundId found for ${chain}/${address}`);
        }
      });
  response.send(`${request.query.text}. Chain: ${chain} Address: ${address}`);
});


// Get the latest round data from the RTDB and return it to the client
// exports.getLatestRoundData = functions.https.onRequest(async (req, res) => {
//   const db = admin.database();
//   const ref = db.ref("oracles/ETH_ETHUSD/latestRound");
//   const snapshot = await ref.once("value");
//   res.send(snapshot.val());
// }
