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
  measurementId: "G-EH6B1DM9XH",
};

export async function createUserProfileDocument(userAuth, additionalData) {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(`Error creating user ${error.message}`);
    }
  }

  return userRef;
}

export function convertCollectionsSnapshotToMap(collections) {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

// export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
//   // one off function
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();

//   // push into database only title and items objects as the routes and ids will be generated by Firebase. Data for the route names are important only for the front-end
//   const cleanedDataArray = Object.values(objectsToAdd).map(
//     ({ title, items }) => ({
//       title,
//       items,
//     })
//   );
//   console.log(cleanedDataArray);

//   cleanedDataArray.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     console.log(newDocRef);
//     batch.set(newDocRef, obj);
//   });

//   return await batch.commit();
// }

firebase.initializeApp(CONFIG);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
