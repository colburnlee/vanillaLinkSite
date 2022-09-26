import { Github, Twitter } from "../Icons";

// For Testing - Delete or Comment prior to commit

// import { doc, getDoc, getDocs, collection } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { db, rtdb } from "../../firebase/firebase.config";
// import { ref, get, child } from "firebase/database";

// End Testing

const About = () => {
  // Realtime Database (RTDB) Testing
  // const [rtdbDecimals, setrtdbDecimals] = useState(null);
  // const [rtdbLatestRound, setrtdbLatestRound] = useState(null);

  // const rtdbRef = ref(rtdb);
  // const getRtdbDecimals = async (ref) => {
  //   const snapshot = await get(child(ref, "/oracles/ETH_ETHUSD/decimals"));
  //   if (snapshot.exists()) {
  //     console.log("RTDB RESULT: ", snapshot.val());
  //     setrtdbDecimals(snapshot.val());
  //   } else {
  //     console.log("No RTDB data available", rtdbRef);
  //   }
  // };

  // const getLatestRound = async (ref) => {
  //   const snapshot = await get(child(ref, "/oracles/ETH_ETHUSD/latestRound"));
  //   if (snapshot.exists()) {
  //     console.log("RTDB RESULT: ", snapshot.val());
  //     setrtdbLatestRound(
  //       `Latest Answer: ${snapshot.val().answer} at ${new Date(
  //         snapshot.val().updatedAt * 1000
  //       )}`
  //     );
  //   } else {
  //     console.log("No RTDB data available", rtdbRef);
  //   }
  // };

  // // For Firestore Testing
  // const [fbDecimals, setfbDecimals] = useState(null);
  // const [fbDescription, setfbDescription] = useState(null);

  // // Firestore DB
  // const docRef = doc(db, "ETH", "ETHUSD");
  // const dataRef = collection(db, "ETH", "ETHUSD/history");
  // const dataDocRef = doc(db, "ETH", "ETHUSD/history", "u5HcLE21gEUw3Ifo8tnE");
  // // // Get decimals from firebase and set state
  // const getDecimals = async (ref) => {
  //   const docSnap = await getDoc(ref);
  //   console.log(docSnap.data());
  //   setfbDecimals(docSnap.data().decimals);
  // };
  // // // Get description from firebase and set state
  // const getDescription = async (ref) => {
  //   const docSnap = await getDoc(ref);
  //   console.log(docSnap.data());
  //   setfbDescription(docSnap.data().Description);
  // };

  // // // Get all data from firebase and set state
  // const getData = async (ref) => {
  //   const querySnapshot = await getDocs(ref);

  //   // Two techniques for getting data - Map or forEach
  //   // Map
  //   console.log(querySnapshot.docs.map((doc) => doc.data()));

  //   // forEach
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data().answer}`);
  //   });
  // };

  // const getDataDoc = async (ref) => {
  //   const docSnap = await getDoc(ref);
  //   console.log(docSnap.data());
  // };

  // useEffect(() => {
  //   getDecimals(docRef);
  //   getDescription(docRef);
  //   getData(dataRef);
  //   getDataDoc(dataDocRef);
  //   getRtdbDecimals(rtdbRef);
  //   getLatestRound(rtdbRef);
  // }, [docRef, dataRef, dataDocRef, rtdbRef]);

  // End Testing

  return (
    <section className="text-gray-600 body-font flex flex-col min-h-screen ">
      <div className="container px-5 py-24 mx-auto items-center justify-center min-h-full">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline-block w-8 h-8 text-gray-400 mb-8"
            viewBox="0 0 975.036 975.036"
          >
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed text-lg">
            I made this website to help people who are interested in crypto,
            data science, and in particular - the Ethereum blockchain. My
            curiousity in Chainlink grew after realizing that, in one way or
            another, I have an insane amount of my life savings riding on the
            protocol. I hope you find it useful. Feel free to reach out to me on
            Twitter if you have any questions or suggestions.
          </p>
          <span className="inline-block h-1 w-10 rounded bg-emerald-600 mt-8 mb-6"></span>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
            Lee Colburn
          </h2>
          <a
            href="https://twitter.com/bbno_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-8 h-8 text-gray-400 mb-8"
          >
            <Twitter />
          </a>
          <a
            href="https://github.com/colburnlee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-8 h-8 text-gray-400 mb-8"
          >
            <Github />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
