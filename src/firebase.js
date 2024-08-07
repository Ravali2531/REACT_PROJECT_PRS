// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1hwGJXyCh_Oeh7N577TmnYS9HFlazJRo",
  authDomain: "react-project-prs.firebaseapp.com",
  projectId: "react-project-prs",
  storageBucket: "react-project-prs.appspot.com",
  messagingSenderId: "801095411181",
  appId: "1:801095411181:web:a7139d9f7c984bfa0033e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app); // Use Firestore initialization
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, firestore, database }; // Export Firestore as firestore
