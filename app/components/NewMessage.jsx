import { useState } from "react";
import { addDataWithAutoID } from "../firestore/addData";
import { useAuthContext } from "../contexts/LoggedInUser";
import { doc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
const db = getFirestore(app);

export default function NewMessage() {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addDataWithAutoID("messages", {
          body: newMessage,
          userRef: doc(db, "users", user.uid),
        });
      }}
    >
      <textarea
        value={newMessage}
        onChange={(event) => {
          setNewMessage(event.target.value);
        }}
      ></textarea>
      <button>Send</button>
    </form>
  );
}
