import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBOFxwKLc65RuUVnQ_G7CCNER4Gw8t-kc8",
    authDomain: "ifaz-portfolio.firebaseapp.com",
    projectId: "ifaz-portfolio",
    storageBucket: "ifaz-portfolio.firebasestorage.app",
    messagingSenderId: "298499280142",
    appId: "1:298499280142:web:8381e4a55eb6be59a95b5f",
    measurementId: "G-71YP3B9GWH"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };