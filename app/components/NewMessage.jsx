import { useState } from "react";
import { addDataWithAutoID } from "../firestore/addData";
import { useAuthContext } from "../contexts/LoggedInUser";
import { doc, getFirestore, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebase";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
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
          createdAt: serverTimestamp(),
        });
        setNewMessage("");
      }}
    >
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Message</InputLabel>
        <OutlinedInput
          value={newMessage}
          onChange={(event) => {
            setNewMessage(event.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label={"send message"} edge="end" type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Message"
        />
      </FormControl>
    </form>
  );
}
