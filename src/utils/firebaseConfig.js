// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3bnoibk04YrsoIWnh0jIseBtRR52ikhw",
  authDomain: "ecommercetask-efd66.firebaseapp.com",
  projectId: "ecommercetask-efd66",
  storageBucket: "ecommercetask-efd66.appspot.com",
  messagingSenderId: "335899552762",
  appId: "1:335899552762:web:19033eae51d5fc119ad243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
