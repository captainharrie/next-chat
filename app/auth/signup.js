import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import addData from "../firestore/addData";

export default async function signUp(email, displayName, password) {
  try {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      email,
      displayName,
      password
    );
    const { result } = await addData("users", newUser.user.uid, {
      email: newUser.user.email,
      displayName: newUser.user.displayName,
      password: newUser.user.reloadUserInfo.passwordHash,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
