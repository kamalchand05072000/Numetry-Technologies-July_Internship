// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY", // Replace with your actual API key
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Simulate sending OTPs
  function sendOTP() {
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
  
    // Simulate sending Email OTP
    const emailOTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    localStorage.setItem('emailOTP', emailOTP);
    alert(`Email OTP sent: ${emailOTP}`);
  
    // Send Mobile OTP using Firebase
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message
        window.confirmationResult = confirmationResult;
        alert('Mobile OTP sent');
      }).catch((error) => {
        console.error("Error during signInWithPhoneNumber", error);
      });
  }
  
  // Verify OTPs
  function verifyOTP() {
    const emailOTP = document.getElementById("emailOTP").value;
    const phoneOTP = document.getElementById("phoneOTP").value;
  
    // Verify Email OTP
    const storedEmailOTP = localStorage.getItem('emailOTP');
    if (emailOTP == storedEmailOTP) {
      alert('Email OTP verified successfully');
    } else {
      alert('Invalid Email OTP');
    }
  
    // Verify Mobile OTP using Firebase
    window.confirmationResult.confirm(phoneOTP).then((result) => {
      // User signed in successfully
      const user = result.user;
      alert('Phone authentication successful');
    }).catch((error) => {
      console.error("Error during confirmationResult.confirm", error);
    });
  }
  