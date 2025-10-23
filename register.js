import { auth } from "./firebase-config.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

let confirmationResult;

// 🔹 Setup Recaptcha
window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  size: "normal",
  callback: () => {
    console.log("reCAPTCHA verified");
  },
  "expired-callback": () => {
    alert("reCAPTCHA expired. Please refresh and try again.");
  },
});

// 🔹 Send OTP
document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const appVerifier = window.recaptchaVerifier;

  if (!phoneNumber.startsWith("+")) {
    alert("Please include country code (e.g. +91)");
    return;
  }

  try {
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    document.getElementById("statusMsg").textContent = "✅ OTP sent to " + phoneNumber;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ Error sending OTP: " + error.message;
    console.error(error);
  }
});

// 🔹 Verify OTP
document.getElementById("verifyOtpBtn").addEventListener("click", async () => {
  const code = document.getElementById("otp").value;

  try {
    const result = await confirmationResult.confirm(code);
    const user = result.user;
    document.getElementById("statusMsg").textContent = `✅ Logged in as ${user.phoneNumber}`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ Invalid OTP.";
    console.error(error);
  }
});

// 🔹 Google Login
document.getElementById("googleLogin").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    document.getElementById("statusMsg").textContent = `✅ Logged in as ${result.user.displayName}`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ Google login failed.";
    console.error(error);
  }
});

// 🔹 GitHub Login
document.getElementById("githubLogin").addEventListener("click", async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    document.getElementById("statusMsg").textContent = `✅ Logged in as ${result.user.displayName || result.user.email}`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ GitHub login failed.";
    console.error(error);
  }
});

// 🔹 Microsoft Login
document.getElementById("microsoftLogin").addEventListener("click", async () => {
  const provider = new OAuthProvider("microsoft.com");
  try {
    const result = await signInWithPopup(auth, provider);
    document.getElementById("statusMsg").textContent = `✅ Logged in as ${result.user.displayName}`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ Microsoft login failed.";
    console.error(error);
  }
});
