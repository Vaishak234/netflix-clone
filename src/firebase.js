import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBjTrSCPisxBNIxdwUhy3-P8dbiXqtkGfo",
  authDomain: "netflix-clone-2ac0e.firebaseapp.com",
  projectId: "netflix-clone-2ac0e",
  storageBucket: "netflix-clone-2ac0e.appspot.com",
  messagingSenderId: "802317378089",
  appId: "1:802317378089:web:7a1837187d00c8ba663238",
  measurementId: "G-XWDNXC1X4P"
};
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const auth = getAuth(app)



export { auth}