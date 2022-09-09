import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4XdigZKyiQI0oAndOvKmyfbkq8HvVem4",
  authDomain: "link-to-the-past-a5042.firebaseapp.com",
  projectId: "link-to-the-past-a5042",
  storageBucket: "link-to-the-past-a5042.appspot.com",
  messagingSenderId: "1050404766506",
  appId: "1:1050404766506:web:20a98e41de038618205453",
  measurementId: "G-G25SGGN1GY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = null;
let db = null;

if (window.location.hostname === "localhost") {
  storage = getStorage();
  connectStorageEmulator(storage, "localhost", 9199);
  db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log(
    "Connected to Firebase Emulator Project: ",
    db.app.options.projectId
  );
} else {
  storage = getStorage(app);
  db = getFirestore(app);
  console.log(
    "Connected to Firebase Server Project: ",
    db.app.options.projectId
  );
}
export { storage, app, db };
