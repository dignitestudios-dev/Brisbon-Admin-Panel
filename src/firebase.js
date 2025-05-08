
import { initializeApp } from "firebase/app";
import { collection, query, where, onSnapshot,getFirestore,serverTimestamp,addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWh8GMWmimso--s2OrAyzeta2kxEpcFJM",
  authDomain: "brisbon-notary.firebaseapp.com",
  projectId: "brisbon-notary",
  storageBucket: "brisbon-notary.firebasestorage.app",
  messagingSenderId: "630194898115",
  appId: "1:630194898115:web:8155c41d4e50c8e4fc0e76",
  measurementId: "G-9538XWESN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db,collection,onSnapshot,query,serverTimestamp,addDoc}