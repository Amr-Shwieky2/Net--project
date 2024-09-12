import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDb_f8g-Sxi_KnX3JqRbnpckc5NpTbG1XY",
  authDomain: "netaproject-956a0.firebaseapp.com",
  projectId: "netaproject-956a0",
  storageBucket: "netaproject-956a0.appspot.com",
  messagingSenderId: "1009751406228",
  appId: "1:1009751406228:web:906c280f4972b80d062681",
  measurementId: "G-4KQBK02FKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Firebase Storage
