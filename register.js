// app.js
import {
  auth,
  googleProvider,
  githubProvider,
  microsoftProvider
} from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// === FORM TOGGLING ===
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const formTitle = document.getElementById("formTitle");

window.showLogin = () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formTitle.textContent = "Sign In";
};

window.showSignup = () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  formTitle.textContent = "Create Account";
};

// === SIGNUP ===
signupForm.addEventListener("submit", async e => {
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: `${firstname} ${lastname}`
    });
    alert("Signup successful!");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});

// === LOGIN ===
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// === OAUTH LOGIN ===
const oauthLogin = async provider => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("OAuth Login failed: " + err.message);
  }
};

document.getElementById("googleBtn").onclick = () => oauthLogin(googleProvider);
document.getElementById("githubBtn").onclick = () => oauthLogin(githubProvider);
document.getElementById("microsoftBtn").onclick = () => oauthLogin(microsoftProvider);
