import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCSEieKWR03kHUaY_OqpnGfWavejlx2lSE",
    authDomain: "hackathon-9b11f.firebaseapp.com",
    projectId: "hackathon-9b11f",
    storageBucket: "hackathon-9b11f.firebasestorage.app",
    messagingSenderId: "1092988283991",
    appId: "1:1092988283991:web:72214b61bd2957e7254712"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };