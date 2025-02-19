import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBPk7manmm_KOihRywjemcsIpCSKSSg3JE",
    authDomain: "e-comerce-utez.firebaseapp.com",
    projectId: "e-comerce-utez",
    storageBucket: "e-comerce-utez.firebasestorage.app",
    messagingSenderId: "1056346743497",
    appId: "1:1056346743497:web:72f1cd5f29953008382318"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };