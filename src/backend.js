import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAXOwRhzmLCardVYzHt5RtnIeOGJLL8qDM",
    authDomain: "capp-e41a3.firebaseapp.com",
    databaseURL: "https://capp-e41a3.firebaseio.com",
    projectId: "capp-e41a3",
    storageBucket: "capp-e41a3.appspot.com",
    messagingSenderId: "301493939307",
    appId: "1:301493939307:web:be9dab8aaa8f6ef3ac952e",
    measurementId: "G-VZMWMDS76Z"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;