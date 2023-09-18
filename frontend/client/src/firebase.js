// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXS76gTG4a9dIJmyQCRWi1w4Dv_oStQ7U",
  authDomain: "sit314-7d5d5.firebaseapp.com",
  projectId: "sit314-7d5d5",
  storageBucket: "sit314-7d5d5.appspot.com",
  messagingSenderId: "7718007245",
  appId: "1:7718007245:web:61c01a029d8b6896551484",
  measurementId: "G-8FBC3V5JB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

