import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyABCZO1XFRBiUn64hdX2c5cYNpxvUaWLko",
    authDomain: "blog-b0718.firebaseapp.com",
    projectId: "blog-b0718",
    storageBucket: "blog-b0718.appspot.com",
    messagingSenderId: "103067567055",
    appId: "1:103067567055:web:08a75540c68789188488ba",
    measurementId: "G-7DXD7QH25C"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp)
const analytics = getAnalytics(firebaseApp);
