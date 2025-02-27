import { useEffect, useRef, useState } from "react";
import { app } from "@/lib/firebase";
import "firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { formatRelative } from "date-fns";

const db = getFirestore(app);

export default function ChatRoom(props) {
    const [messages, setMessages] = useState([]);

    async function getMessages() {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const fetchedMessages = querySnapshot.docs.map(doc => doc.data())
        setMessages(fetchedMessages);
    }

    useEffect(() => {
        getMessages()
    }, [])

  return (
    <section id="chat_room">
        {messages.map(message => <p>{message.userRef.firestore._firestoreClient.user.uid}: {message.body}</p>)}
    </section>
  );
}