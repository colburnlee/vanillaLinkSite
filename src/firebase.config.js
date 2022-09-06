import { initializeApp } from "firebase/app";
import { getStorage, connectStorageEmulator } from "firebase/storage";

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

if (window.location.hostname === "localhost") {
  storage = getStorage();
  connectStorageEmulator(storage, "localhost", 9199);
  console.log("Connected to Firebase Emulator");
} else {
  storage = getStorage(app);
  console.log("Connected to Firebase Server");
}
export { storage, app };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // PRODUCTION STORAGE
// // const storage = getStorage(app);
// // const filesListRef = ref(storage, "data/");
// // DEV - STORAGE EMULATOR
// const storage = getStorage(app);
// connectStorageEmulator(storage, "localhost", 9199);
// const filesListRef = ref(storage);
// const listAllFiles = async () => await listAll(filesListRef);
// console.log(listAll(filesListRef));
