const firebaseConfig = {
  apiKey: "AIzaSyAARY3XCb_p0KpVPRsUh-zN8DY_OxkgisE",
  authDomain: "the-ars-team.firebaseapp.com",
  projectId: "the-ars-team",
  storageBucket: "the-ars-team.firebasestorage.app",
  messagingSenderId: "247839744361",
  appId: "1:247839744361:web:1d8f1e637659d5efb71df8",
  measurementId: "G-9KR4V2EMHJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export {
  auth,
  googleProvider,
  githubProvider,
  microsoftProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
