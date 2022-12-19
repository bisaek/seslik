// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA2Sx0avOfVipL2mHI2KR7sGBqGz1P6rSs',
	authDomain: 'seslik.firebaseapp.com',
	projectId: 'seslik',
	storageBucket: 'seslik.appspot.com',
	messagingSenderId: '549551613790',
	appId: '1:549551613790:web:a18ccb19e0661b72f9d1cf',
	measurementId: 'G-2JNSFQEPNT'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
