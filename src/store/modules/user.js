import firebase from 'firebase'
export default {
  state: {
    user: null
  },
  actions: {
    signUpUser ({commit}, pl) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(pl.email, pl.password)
        .then((user) => {
          user.updateProfile({
            displayName: pl.firstName + ' ' + pl.lastName
          })
            .then(() => {
              commit('saveUser', firebase.auth().currentUser)
              resolve()
            }, (err) => {
              console.log('Update to user profile failed with firebase: ' + err)
            })
        })
        .catch((err) => {
          reject(err.code)
        })
      })
    }
  },
  mutations: {
    saveUser (state, pl) {
      state.user = pl
    }
  }
}
