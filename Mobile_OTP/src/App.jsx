import React, { useState, useEffect } from "react";
import firebase from "./firebase";

const App = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    if (!recaptchaVerifier) {
      const verifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
          setRecaptchaVerified(true);
        },
        "expired-callback": () => {
          console.log("Recaptcha expired, resetting...");
          setRecaptchaVerified(false);
          verifier.render().then((widgetId) => {
            grecaptcha.reset(widgetId);
          });
        },
        "error-callback": (error) => {
          console.log("Recaptcha error", error);
          setRecaptchaVerified(false);
        },
        defaultCountry: "IN",
      });
      setRecaptchaVerifier(verifier);
    } else {
      recaptchaVerifier.render();
    }
  }, [recaptchaVerifier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setMobile(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaVerifier) {
      console.log("Recaptcha verifier not initialized");
      return;
    }

    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = recaptchaVerifier;

    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      console.log("OTP has been sent");
    } catch (error) {
      console.log("SMS not sent", error);
      // Reset recaptcha if SMS sending fails
      recaptchaVerifier.render().then((widgetId) => {
        grecaptcha.reset(widgetId);
      });
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);

    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      console.log(JSON.stringify(user));
      alert("User is verified");
    } catch (error) {
      console.log("Incorrect OTP", error);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="recaptcha-container"></div>
        <input
          type="number"
          name="mobile"
          placeholder="Enter Mobile Number"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input
          type="number"
          name="otp"
          placeholder="Enter OTP"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
