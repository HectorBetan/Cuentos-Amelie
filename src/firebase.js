
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCDUVb8-rU9KLJctEqtm-LGj4s2bU218Lo",
  authDomain: "cuentos-amelie.firebaseapp.com",
  projectId: "cuentos-amelie",
  storageBucket: "cuentos-amelie.appspot.com",
  messagingSenderId: "781118352662",
  appId: "1:781118352662:web:78b2e6091ef3cdc4917437",
  measurementId: "G-NJ8ZS86K9R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);