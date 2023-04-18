// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// dev/prod
// const firebaseConfig = {
//     apiKey: 'AIzaSyAyOHPh-96kp3e-i-bCqwgCh7iVYaP_EmQ',
//     authDomain: 'react-cursos-80424.firebaseapp.com',
//     projectId: 'react-cursos-80424',
//     storageBucket: 'react-cursos-80424.appspot.com',
//     messagingSenderId: '324221091766',
//     appId: '1:324221091766:web:c8aaa8c6cc1655a7d8cb17'
// };

// testing
const firebaseConfig = {
    apiKey: "AIzaSyD_R0broM5psqaBSFThki-CwqfvEP6nsOI",
    authDomain: "test-journalreact.firebaseapp.com",
    projectId: "test-journalreact",
    storageBucket: "test-journalreact.appspot.com",
    messagingSenderId: "568060227666",
    appId: "1:568060227666:web:5c53980608c6ae8b62ef8b"
  };

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);