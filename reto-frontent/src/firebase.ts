import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "restaurant-app-xxxxx.firebaseapp.com",
  projectId: "restaurant-app-xxxxx",
  storageBucket: "restaurant-app-xxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;