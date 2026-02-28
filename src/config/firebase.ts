import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Substitua com suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyExample",
  authDomain: "mr-family-legacy.firebaseapp.com",
  projectId: "mr-family-legacy",
  storageBucket: "mr-family-legacy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
