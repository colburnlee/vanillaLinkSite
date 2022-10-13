const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// takes in chain and pair and returns the pair's latest data
exports.getLatestFromRtdb = functions.https.onRequest((request, response) => {
  const rtdb = admin.database();
  const {ref, get} = require("firebase/database");
  // Chain is the first 3 characters of the address
  const chain = request.query.text.slice(0, 3);
  // pair is the rest of the characters
  const pair = request.query.text.slice(4);
  // Ask the RTDB for the most recent roundId for the chain/pair
  console.log(`input: ${request.query.text}`);
  const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(rtdbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const latestRound = snapshot.val().latestRound;
      response.send(`${request.query.text}. Chain: ${chain} pair: ${pair}.
      Latest Round Info: ${latestRound.answer}
       ${latestRound.startedAt} ${latestRound.updatedAt}
        ${latestRound.answeredInRound}`);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }
  );
});

// Takes in the chain and pair and returns the pair's
// latest data from the Chainlink Oracle
exports.getLatestFromOracle = functions.https.onRequest((request, response) => {
  const rtdb = admin.database();
  const {ref, get, set} = require("firebase/database");
  // Chain is the first 3 characters. Pair is the rest.
  const chain = request.query.text.slice(0, 3);
  const pair = request.query.text.slice(4);
  // Ask the RTDB for the most recent roundId for the chain/pair
  const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(rtdbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const proxy = snapshot.val().proxyAddress;
      const decimals = snapshot.val().decimals;
      console.log(`${request.query.text}. Proxy: ${proxy}`);
      // Ask the Chainlink Oracle for the latest round data
      const ethers = require("ethers");
      const provider = new ethers.providers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_TOKEN}`);

      // eslint-disable-next-line max-len
      const abi = ["function latestRoundData() view returns(uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"];

      const contract = new ethers.Contract(proxy, abi, provider);
      contract.latestRoundData().then((result) => {
        response.send(`${request.query.text}. Chain: ${chain} pair: ${pair}
        Latest Oracle Round: ${result.startedAt}  `);
        set(ref(rtdb, `oracles/${chain}_${pair}/oracleLatestRound`), {
          answer: +result.answer,
          startedAt: +result.startedAt,
          updatedAt: +result.updatedAt,
          answeredInRound: result.answeredInRound.toString(),
          roundId: result.roundId.toString(),
          price: +result.answer / Math.pow(10, decimals),
        })
            .then(() => {
              return (console.log("RTDB updated!"));
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
    console.error(error);
  }
  );
});

// Takes in chain and pair, attempts to update the RTDB
exports.attemptRtdbUpdate = functions.https.onRequest((request, response) => {
  const rtdb = admin.database();
  // eslint-disable-next-line no-unused-vars
  const {ref, get, set} = require("firebase/database");
  // Chain is the first 3 characters. Pair is the rest.
  const chain = request.query.text.slice(0, 3);
  const pair = request.query.text.slice(4);
  // Ask the RTDB for the most recent roundId for the chain/pair
  const rtdbRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(rtdbRef).then((snapshot) => {
    if (snapshot.exists()) {
      const proxy = snapshot.val().proxyAddress;
      // const decimals = snapshot.val().decimals;
      // eslint-disable-next-line no-undef
      const latestRound = BigInt(snapshot.val().latestRound.roundId);
      console.log(`${request.query.text}. Proxy: ${proxy}. 
      Previous RTDB Latest Round: ${latestRound}`);
      // Ask the Chainlink Oracle for the latest round data
      const ethers = require("ethers");
      const provider = new ethers.providers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_TOKEN}`);

      // eslint-disable-next-line max-len
      const abi = ["function getRoundData(uint80 roundId)  view returns(uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"];

      const contract = new ethers.Contract(proxy, abi, provider);
      const results = [];
      // eslint-disable-next-line no-undef
      const nextRound = latestRound + BigInt(1);
      // eslint-disable-next-line no-undef
      for (let i = BigInt(0); i < 10; i++) {
        contract.getRoundData(nextRound+i).then((result) => {
          return new Promise((resolve, reject) => {
            if (result.answeredInRound > 0) {
              results.push(result);
              resolve();
            }
            reject(new Error("No data available"));
          });
          // set(ref(rtdb, `data/${chain}_${pair}/
          // ${result.roundId.toString()}`), {
          //   answer: +result.answer,
          //   startedAt: +result.startedAt,
          //   updatedAt: +result.updatedAt,
          //   answeredInRound: result.answeredInRound.toString(),
          //   roundId: result.roundId.toString(),
          //   price: +result.answer / Math.pow(10, decimals),
          // })
          // .catch((error) => {
          //   return (console.error(error));
          // }
          // );
        })
            .catch((error) => {
              console.error(error);
            }
            );
        console.log(results);
        // response.send(results);
      }
    } else {
      return (console.log("No data available"));
    }
  }).catch((error) => {
    console.error(error);
  }
  );
});
