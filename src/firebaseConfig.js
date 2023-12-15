// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDUbgG2hgC5K6DM3NFftSBGVEenXVdnss",
  authDomain: "linkedin-clone-945dc.firebaseapp.com",
  projectId: "linkedin-clone-945dc",
  storageBucket: "linkedin-clone-945dc.appspot.com",
  messagingSenderId: "656702452641",
  appId: "1:656702452641:web:51a5c063942f597c9ed1e0"
};


// console.log("import.meta.env.VITE_APIKEY :>> ", import.meta.env.VITE_APIKEY);

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSERDERID,
//   appId: import.meta.env.VITE_APPID,
// };


// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore,storage }


