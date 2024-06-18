import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBRvO29eG2dTcOBl5-36ilpFqk8gWYkl2k",
  // authDomain: "trading-journal-bf221.firebaseapp.com",
  // projectId: "trading-journal-bf221",
  // storageBucket: "trading-journal-bf221.appspot.com",
  // messagingSenderId: "176979770863",
  // appId: "1:176979770863:web:4f4d4bd5058f5f43b90a1a",
  // measurementId: "G-SJHHNPEPP6"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };