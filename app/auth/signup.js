import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import addData from "../firestore/addData";

export default async function signUp(email, password) {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
    const { result } = await addData("users", newUser.user.uid, {
      email: newUser.user.email,
      password: newUser.user.reloadUserInfo.passwordHash,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
