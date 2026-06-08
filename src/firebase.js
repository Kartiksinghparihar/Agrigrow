import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firestore
import { getFirestore } from "firebase/firestore";

// Realtime DB
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvLFvvvcOGopCu-jTG2_Msr92pGQtDyjw",
  authDomain: "agrigrow-50834.firebaseapp.com",
  databaseURL: "https://agrigrow-50834-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ FIXED
  projectId: "agrigrow-50834",
  storageBucket: "agrigrow-50834.firebasestorage.app",
  messagingSenderId: "24514814061",
  appId: "1:24514814061:web:3fc830d8860b3c51069f64",
  measurementId: "G-PNZW7805VX"
};

const app = initializeApp(firebaseConfig);

// 🔐 AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔥 FIRESTORE
export const db = getFirestore(app);

// ⚡ REALTIME DB
export const rtdb = getDatabase(app);