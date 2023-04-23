
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-X2aIMlnXehPWHfqktK64WqfXDWS7uJA",
  authDomain: "clone-966a1.firebaseapp.com",
  projectId: "clone-966a1",
  storageBucket: "clone-966a1.appspot.com",
  messagingSenderId: "537620734",
  appId: "1:537620734:web:1ad4c9e80e84af9bd5f5af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig