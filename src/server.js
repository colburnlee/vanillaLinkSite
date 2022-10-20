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
  limitToLast,
  startAt,
} = require("firebase/database");
const initializeApp = require("firebase/app").initializeApp;
const PropTypes = require("prop-types");

// Initialize Express
const PORT = process.env.PORT || 8088; // This is modified as 8080 conflicts with Firebase Emulator
const app = express();
app.use(express.json());

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
const useEmulator = false;
if (useEmulator) {
  rtdb = getDatabase();
  connectDatabaseEmulator(rtdb, "localhost", 9000);
  console.log("Using RTDB emulator");
} else {
  rtdb = getDatabase(fbApp);
  console.log("Using RTDB production");
}

// Initialize EA Input and Output with Prop Types
let EAInput = {
  id: PropTypes.number | PropTypes.string,
  data: {
    chain: PropTypes.string,
    pair: PropTypes.string,
    time: PropTypes.string,
  },
};

let EAOutput = {
  jobRunId: PropTypes.number | PropTypes.string,
  statusCode: PropTypes.number,
  data: {
    result: PropTypes.any,
  },
  error: PropTypes.string,
};

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
    limitToLast(1)
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
  EAInput = req.body;
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
        let answer = Object.values(snapshot.val())[0].answeredInRound;
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

// returns an array of the previous 20 day's opening rounds for a given pair
app.post("/api/20DayOpenHistory", (req, res) => {
  EAInput = req.body;
  const chain = EAInput.data.chain;
  const pair = EAInput.data.pair;

  const dateRef = ref(rtdb, `data/${chain}_${pair}`);
  let date = new Date();
  date = date.setUTCHours(0, 0, 1, 0) / 1000;
  const dateArray = [];
  for (let i = 1; i < 21; i++) {
    dateArray.push(date);
    date = date - 86400;
  }

  const resultsArray = [];
  dateArray.forEach(function (date) {
    const lookupNextDate = query(
      dateRef,
      orderByChild("/startedAt"),
      endAt(date),
      limitToLast(1)
    );
    // Look up the closest round and push it to an array to return
    get(lookupNextDate).then((snapshot) => {
      if (snapshot.exists()) {
        let answer = Object.values(snapshot.val())[0].answeredInRound;
        resultsArray.push(answer);
      } else {
        console.log(
          `No data available for chain: ${chain} pair: ${pair} at time: ${date}`
        );
        resultsArray.push(null);
      }
    });
  });
  setTimeout(function () {
    EAOutput = {
      jobRunID: EAInput.id,
      statusCode: 200,
      data: {
        result: resultsArray,
      },
      error: null,
    };
    res.status(200).send(EAOutput);
  }, 2500);
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
