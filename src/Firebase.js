import firebase from 'firebase';

const config = {
    projectId: 'reactchat-2849e',
    apiKey: 'AIzaSyBSEe4MT1gEamAmqBxpF7VGsgREMsmI_UY',
    databaseURL: 'https://reactchat-2849e.firebaseio.com'
  };
firebase.initializeApp(config);

export default firebase;