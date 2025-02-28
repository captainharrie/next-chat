"use client";

import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthContext } from "../contexts/LoggedInUser";
import { useEffect, useState } from "react";
import signIn from "../auth/signIn";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error);
    }
    router.push("/chat");
  };

  async function handleLogIn() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) router.push("/chat");
  }, []);

  if (showLoginForm)
    return (
      <form onSubmit={handleForm}>
        <label>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 text-gray-950 border border-gray-300 mx-2 py-1 px-3 rounded"
            type="email"
            placeholder="email@website.com"
            value={email}
          ></input>
        </label>
        <label>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 text-gray-950 border border-gray-300 mx-2 py-1 px-3 rounded"
            type="password"
            placeholder="password"
            value={password}
            required
          ></input>
        </label>
        <button
          type="submit"
          className="bg-blue-400 px-3 py-2 rounded hover:bg-blue-300"
        >
          Sign in
        </button>
      </form>
    );

  return (
    <section className="flex gap-1">
      <button
        className="bg-blue-400 px-3 py-2 rounded hover:bg-blue-300"
        onClick={handleLogIn}
      >
        Sign in with Google Account
      </button>
      <button
        className="bg-blue-400 px-3 py-2 rounded hover:bg-blue-300"
        onClick={() => {
          setShowLoginForm(true);
        }}
      >
        Sign in with Email & Password
      </button>

      <button
        className="bg-blue-400 px-3 py-2 rounded hover:bg-blue-300"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign up with Email & Password
      </button>
    </section>
  );
}
