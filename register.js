import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAARY3XCb_p0KpVPRsUh-zN8DY_OxkgisE",
  authDomain: "the-ars-team.firebaseapp.com",
  projectId: "the-ars-team",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Toggle between forms
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const goLogin = document.getElementById("go-login");
const goSignup = document.getElementById("go-signup");

goLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  loginForm.classList.add("fade-in");
});

goSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  signupForm.classList.add("fade-in");
});

// === SIGNUP HANDLER ===
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await fetch("/.netlify/functions/registerHandler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userCred.user.uid, firstname, lastname, email })
    });

    alert("Signup successful! You can now log in.");
    window.location.href = "dashboard.html";
    signupForm.reset();
    goLogin.click();

  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});

// === LOGIN HANDLER ===
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    const res = await fetch("/.netlify/functions/loginHandler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userCred.user.uid, email })
    });

    const result = await res.json();
    alert(result.message || "Login successful!");

  } catch (err) {
    alert("Login failed: " + err.message);
  }
});


/** // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAARY3XCb_p0KpVPRsUh-zN8DY_OxkgisE",
    authDomain: "the-ars-team.firebaseapp.com",
    projectId: "the-ars-team",
    storageBucket: "the-ars-team.firebasestorage.app",
    messagingSenderId: "247839744361",
    appId: "1:247839744361:web:1d8f1e637659d5efb71df8",
    measurementId: "G-9KR4V2EMHJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app); **/
