import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyBvux9rP1vo2kNbmKF4X-1LFkT1WA8UDdI',
  authDomain: 'todolistapp-12.firebaseapp.com',
  databaseURL: 'https://todolistapp-12.firebaseio.com',
  projectId: 'todolistapp-12',
  storageBucket: 'todolistapp-12.appspot.com',
  messagingSenderId: '912952666292',
  appId: '1:912952666292:web:2bcf74a5c7aa3219cd0fe1',
  measurementId: 'G-4SSSMWVS2Y',
});

const firestore = app.firestore();

window.firestore = firestore;

function toObject(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
