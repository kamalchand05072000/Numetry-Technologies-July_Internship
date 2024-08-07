import firebase from "firebase/compat/app";
import "firebase/compat/auth";

var firebaseConfig = {
    apiKey: "AIzaSyDBKKXGwo4R3O--sGmY0AGwcYuYqE25h4o",
    authDomain: "otp-demo-74d8e.firebaseapp.com",
    projectId: "otp-demo-74d8e",
    storageBucket: "otp-demo-74d8e.appspot.com",
    messagingSenderId: "495720275649",
    appId: "1:495720275649:web:a2d8fa63909cf7564b7e40"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;