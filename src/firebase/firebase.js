// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIA5_I8dibhULzglXJvIiDNsm7g5SAyac",
  authDomain: "discordfirestore.firebaseapp.com",
  projectId: "discordfirestore",
  storageBucket: "discordfirestore.appspot.com",
  messagingSenderId: "967299273319",
  appId: "1:967299273319:web:9d056777d1ff1f77f4fac2",
  measurementId: "G-SWQKPB5EK5"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()