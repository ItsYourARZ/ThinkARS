import {
  auth, googleProvider, githubProvider, microsoftProvider,
  signInWithPopup, createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from './firebase-config.js';

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const goLogin = document.getElementById("go-login");
const goSignup = document.getElementById("go-signup");

// Toggle forms
goLogin.addEventListener("click", e => { e.preventDefault(); signupForm.classList.add("hidden"); loginForm.classList.remove("hidden"); });
goSignup.addEventListener("click", e => { e.preventDefault(); loginForm.classList.add("hidden"); signupForm.classList.remove("hidden"); });

// SIGNUP
signupForm.addEventListener("submit", async e => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) return alert("Passwords do not match!");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch(err) { alert("Error: " + err.message); }
});

// LOGIN
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch(err) { alert("Login failed: " + err.message); }
});

// OAUTH PROVIDERS
document.getElementById("googleBtn").addEventListener("click", async () => { await signInWithPopup(auth, googleProvider); window.location.href="dashboard.html"; });
document.getElementById("githubBtn").addEventListener("click", async () => { await signInWithPopup(auth, githubProvider); window.location.href="dashboard.html"; });
document.getElementById("microsoftBtn").addEventListener("click", async () => { await signInWithPopup(auth, microsoftProvider); window.location.href="dashboard.html"; });
