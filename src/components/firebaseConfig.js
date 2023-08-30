import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUtLUX2LnrwdaxF3j8-KZ413tvOQUWzoA",
  authDomain: "to-do-list-app-3700d.firebaseapp.com",
  projectId: "to-do-list-app-3700d",
  storageBucket: "to-do-list-app-3700d.appspot.com",
  messagingSenderId: "488849761612",
  appId: "1:488849761612:web:bcb7584910f435c2df9be9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
export { auth };
