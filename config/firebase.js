import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    databaseURL: "https://chat-app-9437e.firebaseio.com",
    apiKey: "AIzaSyArg_IcWGN4oJP69zMORHRZLPcuBxt52bQ",
    authDomain: "chat-app-9437e.firebaseapp.com",
    projectId: "chat-app-9437e",
    storageBucket: "chat-app-9437e.appspot.com",
    messagingSenderId: "677137324114",
    appId: "1:677137324114:web:099f64e34edc093545e78b",
    measurementId: "G-PDMB0ESEDE",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
});
const auth = getAuth();
const storage = getStorage();
export { db, auth, storage };
