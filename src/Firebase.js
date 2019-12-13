import * as firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyAhN0IcVrgBKD5U6KBebY9sWM-_DpxQ6sQ",
  databaseURL: "https://scheduler-85cc7.firebaseio.com",
  projectId: "scheduler-85cc7",
  appId: "1:401148320864:web:476dd010a9c0085d557705",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
