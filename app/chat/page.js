"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthContext } from "../contexts/LoggedInUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ChatRoom from "../components/ChatRoom";
import NewMessage from "../components/NewMessage";
import { Button } from "@mui/material";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  if (user)
    return (
      <>
        <section className="p-5 border border-gray-200">
          <p>User: {user.email}</p>
          <ChatRoom />
          <NewMessage />
        </section>
        <Button
          onClick={() => {
            signOut(auth);
            router.push("/login");
          }}
        >
          Sign out
        </Button>
      </>
    );
}
