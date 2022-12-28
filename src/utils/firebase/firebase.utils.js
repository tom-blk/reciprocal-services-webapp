import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyChVUlH21hiQgDWP8uQFJAEXOKEyd2ma_Q",
  authDomain: "reciprocal-services.firebaseapp.com",
  projectId: "reciprocal-services",
  storageBucket: "reciprocal-services.appspot.com",
  messagingSenderId: "417273594192",
  appId: "1:417273594192:web:51a4b988996de02d7dec55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()