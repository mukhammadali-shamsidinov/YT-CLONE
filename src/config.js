import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPbARSTwoqACaVgY4zNZA3Q6ut73vgu3o",
    authDomain: "tutorial-v9.firebaseapp.com",
    projectId: "tutorial-v9",
    storageBucket: "tutorial-v9.appspot.com",
    messagingSenderId: "1028284085966",
    appId: "1:1028284085966:web:6836499a44783d86e0c29f",
    measurementId: "G-92WZY27N5W"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  export {auth,db,storage}