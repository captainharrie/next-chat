import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import "firebase/firestore";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import getData from "../firestore/getData";
// import { formatRelative } from "date-fns";

const db = getFirestore(app);

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    const querySnapshot = await getDocs(collection(db, "messages"));

    const fetchedMessagesPromises = querySnapshot.docs.map(async (doc) => {
      const body = doc.data().body;
      const userData = await getDoc(doc.data().userRef);
      const displayName = await userData.get("displayName");
      return { body, displayName };
    });
    const fetchedMessages = await Promise.all(fetchedMessagesPromises);
    return fetchedMessages;
  }

  useEffect(() => {
    getMessages().then((messages) => {
      setMessages(messages);
    });
  }, []);

  return (
    <section id="chat_room">
      {messages.map((message, i) => (
        <p key={i}>
          {message.displayName}:{message.body}
        </p>
      ))}
    </section>
  );
}
