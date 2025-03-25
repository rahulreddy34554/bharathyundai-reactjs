import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCu2GjFkBWZCzrbE2Y1mqq8u5uYD-zwTfQ",
//   authDomain: "leads-fc7d4.firebaseapp.com",
//   projectId: "leads-fc7d4",
//   storageBucket: "leads-fc7d4.firebasestorage.app",
//   messagingSenderId: "319374718589",
//   appId: "1:319374718589:web:8da4c94f976a1358b46314",
// };
const firebaseConfig = {
apiKey: "AIzaSyDw4bK1Ibariz81hrYfwJ2ZA8wpeNkOl7g",
  authDomain: "bhyundai-cff6b.firebaseapp.com",
  projectId: "bhyundai-cff6b",
  storageBucket: "bhyundai-cff6b.firebasestorage.app",
  messagingSenderId: "683705866285",
  appId: "1:683705866285:web:1941a91d622c797f4dc0a4",
  measurementId: "G-R481DX4LPX"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_SENDERID,
//   appId: process.env.REACT_APP_APPID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
