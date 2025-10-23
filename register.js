import { auth } from "./firebase-config.js";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔹 Action Code Settings (redirects user back after clicking email link)
const actionCodeSettings = {
  url: window.location.href, // redirect to same page after click
  handleCodeInApp: true,
};

// 🔹 Send Sign-In Link
document.getElementById("sendLinkBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    document.getElementById("statusMsg").textContent = `✅ Sign-in link sent to ${email}. Check your inbox.`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = `❌ Error: ${error.message}`;
    console.error(error);
  }
});

// 🔹 Complete Sign-In if user clicks link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem("emailForSignIn");

  if (!email) {
    email = window.prompt("Please provide your email for confirmation:");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      document.getElementById("statusMsg").textContent = `✅ Logged in as ${result.user.email}`;
      window.localStorage.removeItem("emailForSignIn");
    })
    .catch((error) => {
      document.getElementById("statusMsg").textContent = `❌ Error verifying link: ${error.message}`;
    });
}

// 🔹 Google Login
document.getElementById("googleLogin").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    document.getElementById("statusMsg").textContent = `✅ Logged in as ${result.user.displayName}`;
  } catch (error) {
    document.getElementById("statusMsg").textContent = "❌ Google login failed.";
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
  }
});
