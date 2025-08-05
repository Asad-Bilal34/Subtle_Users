// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // ✅ Make sure this is here!
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBsM1swCyOpFOiAuvcitEsJEDjTWP18_eA",
  authDomain: "subtle-marketing.firebaseapp.com",
  projectId: "subtle-marketing",
  databaseURL: "https://subtle-marketing-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ ADD THIS
  messagingSenderId: "427870203171",
  appId: "1:427870203171:web:e2c6ea4affb186050cf096",
  measurementId: "G-RTWDV9T0KR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
const db = getDatabase(app); // ✅ Use this correctly configured DB instance

export { auth,db };

