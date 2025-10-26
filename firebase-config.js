// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyB12XuPOjtJKoso0ezKRCT3pxzVAwH8F7s",
authDomain: "the-ars-team---counter.firebaseapp.com",
projectId: "the-ars-team---counter",
storageBucket: "the-ars-team---counter.firebasestorage.app",
messagingSenderId: "193540636912",
appId: "1:193540636912:web:266facaa7bcabfbf1d4235",
measurementId: "G-N50YTEL8JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);