// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0G2SnsBjjUA4-lDrUnANmo21ElzBRAAU",
  authDomain: "airline-tickets-46241.firebaseapp.com",
  databaseURL: "https://airline-tickets-46241-default-rtdb.firebaseio.com",
  projectId: "airline-tickets-46241",
  storageBucket: "airline-tickets-46241.appspot.com",
  messagingSenderId: "180105580653",
  appId: "1:180105580653:web:3a484c00d7354f77032f64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseURL = "https://airline-tickets-46241-default-rtdb.firebaseio.com";
export const auth = getAuth();
export { firebaseURL, app };
