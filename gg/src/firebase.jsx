// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiHvJ4r_y1pcbCXSbuETy1W20t64LOg40",
  authDomain: "travelstore-df330.firebaseapp.com",
  projectId: "travelstore-df330",
  storageBucket: "travelstore-df330.firebasestorage.app",
  messagingSenderId: "430133751243",
  appId: "1:430133751243:web:6b93791c67f5347d239a4e",
  measurementId: "G-9GZBL9MQZE"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };