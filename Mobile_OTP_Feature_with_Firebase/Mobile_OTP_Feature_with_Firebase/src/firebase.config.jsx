// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDydNEUj12t87MJEsyRLbdMY13jR19QMwQ",
  authDomain: "otp-project-5b57f.firebaseapp.com",
  projectId: "otp-project-5b57f",
  storageBucket: "otp-project-5b57f.appspot.com",
  messagingSenderId: "294849744084",
  appId: "1:294849744084:web:2aa82018d1611b4360ff41",
  measurementId: "G-BX00T5P5NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);