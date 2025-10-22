// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAARY3XCb_p0KpVPRsUh-zN8DY_OxkgisE",
  authDomain: "the-ars-team.firebaseapp.com",
  projectId: "the-ars-team",
  storageBucket: "the-ars-team.firebasestorage.app",
  messagingSenderId: "247839744361",
  appId: "1:247839744361:web:1d8f1e637659d5efb71df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");

// ✅ Export so app.js can use them
export { auth, googleProvider, githubProvider, microsoftProvider };
