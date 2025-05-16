importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
    apiKey: "AIzaSyBBDL2upQ1m0u5NiBhFCBNaQvC9498mTQY",
    authDomain: "snskriti-56ad0.firebaseapp.com",
    projectId: "snskriti-56ad0",
    storageBucket: "snskriti-56ad0.firebasestorage.app",
    messagingSenderId: "980879000290",
    appId: "1:980879000290:web:2f888b25aafab7c2fc54bb",
    measurementId: "G-FZRFF1G5TV"
  };

firebase?.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
    console.log('Hello world from the Service Worker :call_me_hand:');
});


