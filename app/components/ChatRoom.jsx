import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { format } from "date-fns";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  let unsubscribe;
  async function getMessages() {
    const dbQuery = query(collection(db, "messages"), orderBy("createdAt"));
    unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
      const messagePromises = querySnapshot.docs.map(async (doc) => {
        const userData = await getDoc(doc.data().userRef);
        const timestamp = doc.data().createdAt * 1000;
        const formattedTimestamp = format(timestamp, "hh:mm a");
        const [displayName, body] = await Promise.all([
          userData.get("displayName"),
          doc.data().body,
        ]);
        return { displayName, body, formattedTimestamp };
      });
      Promise.all(messagePromises).then((messages) => {
        setMessages(messages);
      });
    });
  }

  useEffect(() => {
    getMessages();
  }, [db]);

  return (
    <section id="chat_room">
      {messages.map((message, i) => (
        <p key={i}>
          <b>{`(${message.formattedTimestamp}) ${message.displayName}: `}</b>{" "}
          {message.body}
        </p>
      ))}
    </section>
  );
}
