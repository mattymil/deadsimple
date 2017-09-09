import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyC1EO1jUzu2KozYsT4G4Coylacur3PsrZY',
  authDomain: 'deadsimplenotes.firebaseapp.com',
  databaseURL: 'https://deadsimplenotes.firebaseio.com',
  projectId: 'deadsimplenotes',
  storageBucket: '',
  messagingSenderId: '1006518236550'
}

firebase.initializeApp(config)
let db = firebase.database()
export default db
