import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = null;
let db = null;
let rtdb = null;

if (window.location.hostname === "localhost") {
  storage = getStorage();
  connectStorageEmulator(storage, "localhost", 9199);
  db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log(
    "Connected to Firebase Firestore Emulator Project: ",
    db.app.options.projectId
  );
  rtdb = getDatabase();
  connectDatabaseEmulator(rtdb, "localhost", 9000);
  console.log(
    "Connected to Firebase Realtime Database Emulator Project: ",
    rtdb.app.options.projectId
  );
} else {
  storage = getStorage(app);
  db = getFirestore(app);
  console.log(
    "Connected to Firebase Server Project: ",
    db.app.options.projectId
  );
  rtdb = getDatabase(app);
  console.log("Connected to Firebase RTDB: ", rtdb.app.options.projectId);
}
export { storage, app, db, rtdb };
