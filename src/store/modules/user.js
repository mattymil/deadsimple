import firebase from 'firebase'
export default {
  state: {
    currentUser: null
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
    },
    login ({commit}, pl) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(pl.email, pl.password)
        .then((user) => {
          commit('saveUser', user)
          resolve()
        })
        .catch((err) => {
          reject(err.code)
        })
      })
    },
    logout ({commit}) {
      firebase.auth().signOut().then(() => {
        commit('removeCurrentUser')
      })
    }
  },
  mutations: {
    saveUser (state, pl) {
      state.currentUser = pl
    },
    removeCurrentUser (state) {
      state.currentUser = null
    }
  }
}
