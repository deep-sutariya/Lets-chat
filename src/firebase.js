import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOrRM4RPDkHPu9G0MuDQFBptoFv4oS2g0",
  authDomain: "whats-app-clone-dca94.firebaseapp.com",
  projectId: "whats-app-clone-dca94",
  storageBucket: "whats-app-clone-dca94.appspot.com",
  messagingSenderId: "153325024250",
  appId: "1:153325024250:web:f1a853fe005567dabeea43",
  measurementId: "G-VP3MFCM6VN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;