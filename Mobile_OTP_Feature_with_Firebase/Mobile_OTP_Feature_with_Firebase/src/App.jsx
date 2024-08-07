import React, { useState } from "react";
import './styles.css';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config.jsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import ReactDOM from 'react-dom';
import { getAuth } from "firebase/auth";


const App = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => onSignup(),
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <section className="container">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="heading-1">👍 Login Success</h2>
        ) : (
          <div className="container_1">
            <h1 className="heading">
              Welcome to <br /> My Home Page
            </h1>
            {showOTP ? (
              <>
                <div className="size">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="otp">Enter your OTP</label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                  inputStyle="otp-input"
                />
                <button
                  onClick={onOTPVerify}
                  className="btn"
                >
                  {loading && <CgSpinner size={20} className="btn-1" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="size">
                  <BsTelephoneFill size={30} />
                </div>
                <label htmlFor="" className="phone">Verify your phone number</label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="btn"
                >
                  {loading && <CgSpinner size={20} className="btn-1" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
