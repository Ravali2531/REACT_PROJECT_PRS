// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// const database = getFirestore(app);


const database = getDatabase(app);
const auth = getAuth(app);

export { auth };
export { database };