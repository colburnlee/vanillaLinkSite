/* eslint-disable no-undef */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {ref, get, set, update,
  query,
  orderByChild,
  endAt,
  limitToLast} = require("firebase/database");
const express = require("express");

// Initialize Express
const app = express();
app.use(express.json());

admin.initializeApp();

// takes in chain and pair and returns the pair's latest data
// exports.getLatestFromRtdb = functions.https.onRequest((request, response) => {
//   const rtdb = admin.database();
//   const {ref, get} = require("firebase/database");
//   // Chain is the first 3 characters of the address
//   const chain = request.query.text.slice(0, 3);
//   // pair is the rest of the characters
//   const pair = request.query.text.slice(4);
//   // Ask the RTDB for the most recent roundId for the chain/pair
//   console.log(`input: ${request.query.text}`);
//   const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}`);
//   get(rtdbRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       const latestRound = snapshot.val().latestRound;
//       response.send(`${request.query.text}. Chain: ${chain} pair: ${pair}.
//       Latest Round Info: ${latestRound.answer}
//        ${latestRound.startedAt} ${latestRound.updatedAt}
//         ${latestRound.answeredInRound}`);
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   }
//   );
// });

// Takes in the chain and pair and returns the pair's
// latest data from the Chainlink Oracle
exports.getLatestFromOracle = functions.https.onRequest((request, response) => {
  const rtdb = admin.database();
  // Chain is the first 3 characters. Pair is the rest.
  const chain = request.query.text.slice(0, 3);
  const pair = request.query.text.slice(4);
  // Ask the RTDB for the proxy address for the chain/pair
  const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}/proxyAddress`);
  get(rtdbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const proxy = snapshot.val();
      console.log(`${request.query.text}. Proxy: ${proxy}`);
      // Ask the Chainlink Oracle for the latest round data
      const ethers = require("ethers");
      const provider = new ethers.providers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_TOKEN}`);

      const abi = ["function latestRoundData() view returns(uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"];

      const contract = new ethers.Contract(proxy, abi, provider);
      contract.latestRoundData().then((result) => {
        response.send(`${request.query.text}. Chain: ${chain} pair: ${pair}
        Latest Oracle Round: ${result.startedAt}  `);
        set(ref(rtdb, `oracles/${chain}_${pair}/latestRound/oracleCurrentRound`), result.roundId.toString())
            .then(() => {
              return (console.log(`Round ${result.roundId} saved to ${chain}_${pair}`));
            }
            )
            .catch((error) => {
              return (console.error(error));
            }
            );
      });
    } else {
      return (console.log("No data available"));
    }
  }).catch((error) => {
    return (console.error(error));
  }
  );
});

// Takes in chain and pair. Pulls in RTDB data for the pair. If the RTDB current round is less than the oracle current round, it updates the RTDB with the latest data.
exports.attemptRtdbUpdate = functions.https.onRequest((request, response) => {
  const rtdb = admin.database();
  // Chain is the first 3 characters. Pair is the rest.
  const chain = request.query.text.slice(0, 3);
  const pair = request.query.text.slice(4);
  // Ask the RTDB for the most recent roundId for the chain/pair
  const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(rtdbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const proxy = snapshot.val().proxyAddress;
      // const decimals = snapshot.val().decimals;
      let latestRound = BigInt(snapshot.val().latestRound.roundId);
      const oracleCurrentRound = BigInt(snapshot.val().latestRound.oracleCurrentRound);
      const decimals = snapshot.val().decimals;
      console.log(`${request.query.text}. Proxy: ${proxy}.
      Previous RTDB Latest Round: ${latestRound}. Oracle Current Round: ${oracleCurrentRound}`);
      const ethers = require("ethers");
      const provider = new ethers.providers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_TOKEN}`);

      const abi = ["function getRoundData(uint80 roundId)  view returns(uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"];
      const contract = new ethers.Contract(proxy, abi, provider);
      // If the RTDB current round is less than the oracle current round, it updates the RTDB with the latest data.
      // while (latestRound < oracleCurrentRound) increment latestRound and get data from ethers
      for (; latestRound < oracleCurrentRound; latestRound++) {
        console.log(`attempting round ${latestRound}`);
        const rtdbRef = ref(rtdb, `data/${chain}_${pair}/${latestRound}`); // create a new ref for each round
        // set a new ref for each round
        set(rtdbRef, {}).then(() => {
          contract.getRoundData(latestRound).then((result) => {
            console.log(`Round ${result.roundId} answer: ${result.answer}`);
            const roundId = result.roundId.toString();
            const answer = +result.answer;
            if (result.answer === 0 || result.answer === null) {
              return (console.log(`Round ${result.roundId} is null`));
            } else {
              return update(rtdbRef, {
                roundId: roundId,
                answer: answer,
                price: answer / Math.pow(10, decimals),
                startedAt: +result.startedAt,
                updatedAt: +result.updatedAt,
                answeredInRound: result.answeredInRound.toString(),
              }).then(() => {
                return (console.log(`Round ${result.roundId} saved to ${chain}_${pair}`));
              }
              )
                  .catch((error) => {
                    return (console.error(error));
                  }
                  );
            }
          });
        }
        );
      }
    } else {
      return (console.log("No data available"));
    }
  }).catch((error) => {
    return (console.error(error));
  }
  );
});

app.post("*/closestRound", (req, res) => {
  EAInput = req.body;
  const rtdb = admin.database();
  const chain = EAInput.data.chain;
  const pair = EAInput.data.pair;
  const time = +EAInput.data.time;
  const dateRef = ref(rtdb, `data/${chain}_${pair}`);
  const lookupNextDate = query(
      dateRef,
      orderByChild("/startedAt"),
      endAt(time),
      limitToLast(1)
  );
  get(lookupNextDate)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const answer = Object.values(snapshot.val())[0].answeredInRound;
          console.log(
              `Successful querery for: ${chain}_${pair} at time: ${time}. Closest round: ${answer}`
          );
          EAOutput = {
            jobRunID: EAInput.id,
            statusCode: 200,
            data: {
              result: answer,
            },
            error: null,
          };
          res.status(200).send(EAOutput);
        } else {
          console.log(
              `No data available for chain: ${chain} pair: ${pair} at time: ${time}`
          );
          EAOutput = {
            jobRunID: EAInput.id,
            statusCode: 404,
            data: {
              result: null,
            },
            error: "No data available",
          };
          res.status(404).send(EAOutput);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
});

app.get("*/getClosestRound/:chain/:pair/:timestamp", (req, res) => {
  const rtdb = admin.database();
  const chain = req.params.chain;
  const pair = req.params.pair;
  const time = +req.params.timestamp;
  const dateRef = ref(rtdb, `data/${chain}_${pair}`);

  const lookupNextDate = query(
      dateRef,
      orderByChild("/startedAt"),
      endAt(time),
      limitToLast(1)
  );
  get(lookupNextDate)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const answer = Object.values(snapshot.val())[0].answeredInRound;
          console.log(
              `Successful querery for: ${chain}_${pair} at time: ${time}. Closest round: ${answer}`
          );
          EAOutput = {
            jobRunID: "lookupDate",
            statusCode: 200,
            data: {
              result: answer,
            },
            error: null,
          };
          res.status(200).send(EAOutput);
        } else {
          console.log(
              `No data available for chain: ${chain} pair: ${pair} at time: ${time}`
          );
          EAOutput = {
            jobRunID: EAInput.id,
            statusCode: 404,
            data: {
              result: null,
            },
            error: "No data available",
          };
          res.status(404).send(EAOutput);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
});

// Pending Deletion - POST Request
// app.post("*/20DayOpenHistory", (req, res) => {
//   EAInput = req.body;
//   const chain = EAInput.data.chain;
//   const pair = EAInput.data.pair;
//   const rtdb = admin.database();
//   console.log(`Request for 20 day open history for ${chain}_${pair}`);

//   const dateRef = ref(rtdb, `data/${chain}_${pair}`);
//   let date = new Date();
//   date = date.setUTCHours(0, 0, 1, 0) / 1000;
//   const dateArray = [];
//   for (let i = 1; i < 21; i++) {
//     dateArray.push(date);
//     date = date - 86400;
//   }

//   const resultsArray = [];
//   dateArray.forEach(function(date) {
//     const lookupNextDate = query(
//         dateRef,
//         orderByChild("/startedAt"),
//         endAt(date),
//         limitToLast(1)
//     );
//     // Look up the closest round and push it to an array to return
//     get(lookupNextDate).then((snapshot) => {
//       if (snapshot.exists()) {
//         const answer = Object.values(snapshot.val())[0].answeredInRound;
//         resultsArray.push(answer);
//       } else {
//         console.log(
//             `No data available for chain: ${chain} pair: ${pair} at time: ${date}`
//         );
//         resultsArray.push(null);
//       }
//     });
//   });
//   setTimeout(function() {
//     EAOutput = {
//       jobRunID: EAInput.id,
//       statusCode: 200,
//       data: {
//         result: resultsArray,
//       },
//       error: null,
//     };
//     res.status(200).send(EAOutput);
//   }, 2500);
// });

app.get("*/20DayOpenHistory/:chain/:pair/", (req, res) => {
  const rtdb = admin.database();
  const chain = req.params.chain;
  const pair = req.params.pair;
  console.log(`Request for 20 day open history for ${chain}_${pair}`);

  const dateRef = ref(rtdb, `data/${chain}_${pair}`);
  let date = new Date();
  date = date.setUTCHours(0, 0, 1, 0) / 1000;
  const dateArray = [];
  for (let i = 1; i < 21; i++) {
    dateArray.push(date);
    date = date - 86400;
  }

  const resultsArray = [];
  dateArray.forEach(function(date) {
    const lookupNextDate = query(
        dateRef,
        orderByChild("/startedAt"),
        endAt(date),
        limitToLast(1)
    );
    // Look up the closest round and push it to an array to return
    get(lookupNextDate).then((snapshot) => {
      if (snapshot.exists()) {
        const answer = Object.values(snapshot.val())[0].answeredInRound;
        resultsArray.push(answer);
      } else {
        console.log(
            `No data available for chain: ${chain} pair: ${pair} at time: ${date}`
        );
        resultsArray.push(null);
      }
    });
  });
  setTimeout(function() {
    EAOutput = {
      jobRunID: "20DayOpenHistory",
      statusCode: 200,
      data: {
        result: resultsArray.join(),
      },
      error: null,
    };
    res.status(200).send(EAOutput);
  }, 2500);
});


// Expose the API as a function
exports.api = functions.https.onRequest(app);
