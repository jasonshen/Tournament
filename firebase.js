const firebase_config = {
    apiKey: "AIzaSyD3esAMutxnGRVLJ1weJWYLzq9lEdKC_5A",
    authDomain: "headlightchallenge.firebaseapp.com",
    databaseURL: "https://headlightchallenge.firebaseio.com",
    projectId: "headlightchallenge",
    storageBucket: "headlightchallenge.appspot.com",
    messagingSenderId: "1015714147289"
};

const firebase = require('firebase');
firebase.initializeApp(firebase_config);
const db = firebase.database();

module.exports = db;