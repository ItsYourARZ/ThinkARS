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

// Forms and links
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const goLogin = document.getElementById("go-login");
const goSignup = document.getElementById("go-signup");

// ---------- Form Switching ----------
goLogin.addEventListener("click", e => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

goSignup.addEventListener("click", e => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

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
    // Optionally set display name
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

document.getElementById("googleBtn").addEventListener("click", () => oauthLogin(googleProvider));
document.getElementById("githubBtn").addEventListener("click", () => oauthLogin(githubProvider));
document.getElementById("microsoftBtn").addEventListener("click", () => oauthLogin(microsoftProvider));

// ---------- PROTECTED ROUTE ----------
onAuthStateChanged(auth, user => {
  // Prevent showing login page if already signed in
  if (user && window.location.pathname.endsWith("index.html")) {
    window.location.href = "dashboard.html";
  }
});
