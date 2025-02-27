"use client";

import { auth, analytics, provider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export default function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  function handleLogIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setLoggedInUser(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  onAuthStateChanged(auth, (user) => {
    // Check for user status
    if (user) {
      setLoggedInUser(user);
    } else {
      setLoggedInUser(null);
    }
  });

  console.log(loggedInUser);
  if (loggedInUser) {
    return (
      <button id="signOutBtn" onClick={handleLogOut}>
        Sign out
      </button>
    );
  }
  return (
    <button id="signInBtn" onClick={handleLogIn}>
      Sign in
    </button>
  );
}
