const express = require("express");
// const axios = require("axios");
const {
  ref,
  query,
  orderByChild,
  endAt,
  limitToFirst,
  get,
  getDatabase,
  connectDatabaseEmulator,
} = require("firebase/database");
const initializeApp = require("firebase/app").initializeApp;

// Initialize Express
const PORT = process.env.PORT || 8088;
const app = express();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4XdigZKyiQI0oAndOvKmyfbkq8HvVem4",
  authDomain: "link-to-the-past-a5042.firebaseapp.com",
  projectId: "link-to-the-past-a5042",
  storageBucket: "link-to-the-past-a5042.appspot.com",
  messagingSenderId: "1050404766506",
  appId: "1:1050404766506:web:20a98e41de038618205453",
  measurementId: "G-G25SGGN1GY",
  databaseURL: "https://link-to-the-past-a5042-default-rtdb.firebaseio.com/",
};
const fbApp = initializeApp(firebaseConfig);
let rtdb = null;
const useEmulator = true;
if (useEmulator) {
  rtdb = getDatabase();
  connectDatabaseEmulator(rtdb, "localhost", 9000);
} else {
  rtdb = getDatabase(fbApp);
}

// Express Routes
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Home Route
app.get("/", (req, res) => {
  res.send("Hello World!@#@!$");
});

//
app.get("/api/closestRound/:chain/:pair/:time", (req, res) => {
  const chain = req.params.chain;
  const pair = req.params.pair;
  const time = +req.params.time;
  const dateRef = ref(rtdb, `data/${chain}_${pair}`);
  const lookupNextDate = query(
    dateRef,
    orderByChild("/startedAt"),
    endAt(time),
    limitToFirst(1)
  );
  get(lookupNextDate)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let answer = Object.values(snapshot.val())[0].answeredInRound;
        console.log(
          `Successful querery for: ${chain}_${pair} at time: ${time}. Closest round: ${answer}`
        );
        res.status(200).send(answer);
      } else {
        console.log(
          `No data available for chain: ${chain} pair: ${pair} at time: ${time}`
        );
        res.status(404).send("No data available");
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/api/closestRound", (req, res) => {
  const EAInput = req.body;
  console.log("EA Input: ", EAInput);
});

// Flagged for deletion
app.get("/closestRound/:chain/:pair/:time", (req, res) => {
  const chain = req.params.chain;
  const pair = req.params.pair;
  const time = +req.params.time;
  const dateRef = ref(rtdb, `data/${chain}_${pair}`);
  const lookupNextDate = query(
    dateRef,
    orderByChild("/startedAt"),
    endAt(time),
    limitToFirst(1)
  );
  get(lookupNextDate)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let answer = Object.values(snapshot.val())[0].answeredInRound;
        console.log(
          `Successful querery for: ${chain}_${pair} at time: ${time}. Closest round: ${answer}`
        );
        res.status(200).send(answer);
      } else {
        console.log(
          `No data available for chain: ${chain} pair: ${pair} at time: ${time}`
        );
        res.status(404).send("No data available");
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/oracle/:chain/:pair", (req, res) => {
  const chain = req.params.chain;
  const pair = req.params.pair;
  const oracleRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(oracleRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let answer = snapshot.val();
        console.log(
          `Successful querery for: ${chain}_${pair} oracle: ${JSON.stringify(
            answer
          )}`
        );
        res.status(200).send(answer);
      } else {
        console.log(`No data available for ${chain}_${pair}`);
        res.status(404).send("No data available");
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/latestRound/:chain/:pair", (req, res) => {
  const chain = req.params.chain;
  const pair = req.params.pair;
  const oracleRef = ref(rtdb, `oracles/${chain}_${pair}`);
  get(oracleRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let answer = snapshot.val().latestRound;
        console.log(
          `Successful querery for: ${chain}_${pair} latest round info: ${JSON.stringify(
            answer
          )}`
        );
        res.status(200).send(answer);
      } else {
        console.log(`No data available for ${chain}_${pair}`);
        res.status(404).send("No data available");
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

process.on("SIGINT", () => {
  console.info("\nShutting down server...");
  process.exit(0);
});
