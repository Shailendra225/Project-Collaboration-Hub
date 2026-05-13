const firebaseConfig = {
  apiKey: "AIzaSyCBfvNRKVgP7hGpo7I-clYCIjcJPPud-ps",
  authDomain: "project-collaboration-hu-5cd13.firebaseapp.com",
  projectId: "project-collaboration-hu-5cd13",
  storageBucket: "project-collaboration-hu-5cd13.firebasestorage.app",
  messagingSenderId: "559989857398",
  appId: "1:559989857398:web:a5cbc91ae4d91b0a045357"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)


const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("Firebase Connected Successfully");
