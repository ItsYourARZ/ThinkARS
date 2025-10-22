import {
  auth,
  googleProvider,
  githubProvider,
  microsoftProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from './firebase-config.js';

// Forms references
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// ---------- Form Switching Functions ----------
window.showLogin = () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};

window.showSignup = () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
};

// ---------- SIGNUP ----------
signupForm.addEventListener("submit", async e => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    return alert("Passwords do not match!");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await userCredential.user.updateProfile({ displayName: `${firstname} ${lastname}` });
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});

// ---------- LOGIN ----------
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// ---------- OAUTH ----------
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

// ---------- PROTECTED ROUTE ----------
onAuthStateChanged(auth, user => {
  if (user && window.location.pathname.endsWith("index.html")) {
    window.location.href = "dashboard.html";
  }
});
