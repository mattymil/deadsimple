import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAXlXg03wd6_V4PJ4MwWnf6nTMhN8QnaKo',
  authDomain: 'vuex-arch-test.firebaseapp.com',
  databaseURL: 'https://vuex-arch-test.firebaseio.com',
  projectId: 'vuex-arch-test',
  storageBucket: '',
  messagingSenderId: '424119698588'
}

firebase.initializeApp(config)
let db = firebase.database()
export default db
