import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAJWdh6M5GrKwGdtdcEkuZvHsxdy5HVxow",
  authDomain: "project-60-c95d0.firebaseapp.com",
  databaseURL: "https://project-60-c95d0.firebaseio.com",
  projectId: "project-60-c95d0",
  storageBucket: "project-60-c95d0.appspot.com",
  messagingSenderId: "404771959149",
  appId: "1:404771959149:web:d507baae24b0d27719ea64"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();