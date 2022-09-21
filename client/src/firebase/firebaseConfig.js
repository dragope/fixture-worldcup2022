import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU2Xy499WEu4MqJX-aJmh1zFcfRvpYCwc",
  authDomain: "fixture-mundial-48fb2.firebaseapp.com",
  projectId: "fixture-mundial-48fb2",
  storageBucket: "fixture-mundial-48fb2.appspot.com",
  messagingSenderId: "851032438343",
  appId: "1:851032438343:web:9e4a89113a7f244e702362"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);