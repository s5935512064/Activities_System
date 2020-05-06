import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import {
  Loading,
  QSpinnerGears
} from 'quasar'

// "async" is optional
export default async ({
  app,
  router,
  store,
  Vue
}) => {
  // something to do
  await firebase.initializeApp({
    apiKey: "AIzaSyAGVvHlda5jQdrPCWyUWJb--PxHmoAVPbo",
    authDomain: "psu-activity.firebaseapp.com",
    databaseURL: "https://psu-activity.firebaseio.com",
    projectId: "psu-activity",
    storageBucket: "psu-activity.appspot.com",
    messagingSenderId: "500446406682",
    appId: "1:500446406682:web:61b1e9b95bfdb73dc289a3",
    measurementId: "G-KQ4KNZXMTS"
  })
}
