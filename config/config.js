import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA3Vsjxof_7-XZIFQ0eGQEBRJ52pxzpHnc',
  authDomain: 'patientmedicalrecords-788c5.firebaseapp.com',
  databaseURL: 'https://patientmedicalrecords-788c5.firebaseio.com',
  projectId: 'patientmedicalrecords-788c5',
  storageBucket: 'patientmedicalrecords-788c5.appspot.com',
  messagingSenderId: '122031193516',
  appId: '1:122031193516:web:9f80d3279417b752150e09',
  measurementId: 'G-9Y2YYHPPVW',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
