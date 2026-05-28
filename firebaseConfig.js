import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBsdpazHIZ4cf7ygJ56khXKo2bHl_hXqSY',
  authDomain: 'myapp-9b0ee.firebaseapp.com',
  projectId: 'myapp-9b0ee',
  storageBucket: 'myapp-9b0ee.firebasestorage.app',
  messagingSenderId: '378278304721',
  appId: '1:378278304721:web:aa78142dc0d9090a07def0',
};

const app = initializeApp(firebaseConfig);

export default app;