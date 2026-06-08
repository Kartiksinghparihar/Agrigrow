import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/farm.png";
import logo from "../assets/logo.png";

import { auth, googleProvider, db } from "../firebase";

import {
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const LoginPage = () => {

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);

  // Setup invisible recaptcha for OTP
  useEffect(() => {

  if (!window.recaptchaVerifier) {

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
        }
      }
    );

  }

}, []);

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {

    try {

      const result = await signInWithPopup(auth, googleProvider);

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          email: result.user.email,
          createdAt: new Date()
        },
        { merge: true }
      );

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  // SEND OTP
  const sendOTP = async () => {

    try {

      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );

      setConfirmResult(confirmation);

      alert("OTP sent");

    } catch (error) {

      alert(error.message);

    }

  };

  // VERIFY OTP
  const verifyOTP = async () => {

    try {

      const result = await confirmResult.confirm(otp);

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          phone: result.user.phoneNumber,
          createdAt: new Date()
        },
        { merge: true }
      );

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid OTP");

    }

  };

  return (

    <div
      className="login"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="login-card">

        <img src={logo} alt="logo" />

        <h2>WELCOME</h2>

        <p>Sign in to continue</p>

        {/* Google Login */}
        <button onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        {/* Phone input */}
        <input
          placeholder="+91XXXXXXXXXX"
          onChange={(e)=>setPhone(e.target.value)}
        />

        <button onClick={sendOTP}>
          Continue with Mobile
        </button>

        {/* OTP input */}
        <input
          placeholder="Enter OTP"
          onChange={(e)=>setOtp(e.target.value)}
        />

        <button onClick={verifyOTP}>
          Verify OTP
        </button>

        <button className="create-btn">
          Create Account
        </button>

        <div id="recaptcha-container"></div>

      </div>

    </div>
  );

};

export default LoginPage;