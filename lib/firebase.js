// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB7KB-EIVCeAQXBp24r4pBLS8ZlVXyLIs",
  authDomain: "spiking-app-c060d.firebaseapp.com",
  projectId: "spiking-app-c060d",
  storageBucket: "spiking-app-c060d.firebasestorage.app",
  messagingSenderId: "218387520668",
  appId: "1:218387520668:web:e66e5c0f9df22026732159",
  measurementId: "G-C7VZS4ZXHJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, app, db };
