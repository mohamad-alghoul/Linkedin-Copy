import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = async () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        })
        .then((ref) => {
          console.log(ref);
        });
    }
    return res;
  } catch (err) {
    return err;
  }
};


export const onLogout =()=>{
  try{
    signOut(auth)
  }catch(err){
    console.log(err)
  }
}