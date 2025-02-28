import { useEffect, useRef, useState } from "react";
import { app } from "@/lib/firebase";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getData from "../firestore/getData";
// import { formatRelative } from "date-fns";

const db = getFirestore(app);

export default function ChatRoom(props) {
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
    return fetchedMessages;
  }

  async function getDisplayName(uid) {
    const displayName = (await getData("users", uid)).result.get("displayName");
    return displayName;
  }

  useEffect(() => {
    getMessages()
      .then((messages) => {
        const messagesOutput = messages.map((message) => {
          const uid = message.userRef.firestore._firestoreClient.user.uid;
          const displayName = getDisplayName(uid);
          return {
            displayName,
            body: message.body,
          };
        });
        return Promise.all(messagesOutput);
      })
      .then((messagesOutput) => {
        setMessages(messagesOutput);
      });
  }, []);

  return (
    <section id="chat_room">
      {messages.map((message) => (
        <p>
          {message.displayName}:{message.body}
        </p>
      ))}
    </section>
  );
}
