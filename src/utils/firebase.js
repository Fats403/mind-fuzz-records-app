import { initializeApp, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVidK1myyXkdlD818IzRR4kzriWhJYiAI",
  authDomain: "mind-fuzz-records.firebaseapp.com",
  projectId: "mind-fuzz-records",
  storageBucket: "mind-fuzz-records.appspot.com",
  messagingSenderId: "439649163770",
  appId: "1:439649163770:web:ebd1e7b104eaabad3f6c43",
  measurementId: "G-9XLRT286R8",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);

// Storage exports
export const storage = getStorage(firebaseApp);
