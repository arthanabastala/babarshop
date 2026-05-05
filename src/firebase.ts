import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlZghS6NN_2fD36c2uMdPDr8VPVOP_aOQ",
  authDomain: "baber-booking-1.firebaseapp.com",
  projectId: "baber-booking-1",
  storageBucket: "baber-booking-1.firebasestorage.app",
  messagingSenderId: "417634798927",
  appId: "1:417634798927:web:cfd41891cda71ac841093a",
  measurementId: "G-GMV0KGVNZV"
};

// initFirebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
