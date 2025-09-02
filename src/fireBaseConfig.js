// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB75IrLsa_FY0oE36P0t_ch65KTU9B3WaQ",
  authDomain: "user-management-c663f.firebaseapp.com",
  projectId: "user-management-c663f",
  storageBucket: "user-management-c663f.firebasestorage.app",
  messagingSenderId: "988578836949",
  appId: "1:988578836949:web:d6d2b0dd589b44b37bcd5c",
  measurementId: "G-5R9FJWPSKQ"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export these for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
