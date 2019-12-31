import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const CONFIG = {
  apiKey: "AIzaSyApG3jDtkcq8PefjSsmwS9nqtlG7gyi78s",
  authDomain: "shop-db-29081.firebaseapp.com",
  databaseURL: "https://shop-db-29081.firebaseio.com",
  projectId: "shop-db-29081",
  storageBucket: "shop-db-29081.appspot.com",
  messagingSenderId: "518252198987",
  appId: "1:518252198987:web:4328cff44a30fad99ae1ce",
  measurementId: "G-EH6B1DM9XH"
};

firebase.initializeApp(CONFIG);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
