import firebase from 'firebase'
export default {
  state: {
    currentUser: null,
    lockout: false
  },
  actions: {
    signUpUser ({commit, dispatch}, pl) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(pl.email, pl.password)
        .then((user) => {
          user.updateProfile({
            displayName: pl.firstName + ' ' + pl.lastName
          })
            .then(() => {
              commit('saveUser', firebase.auth().currentUser)
              dispatch('sendConfEmail')
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
    login ({commit, state}, pl) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(pl.email, pl.password)
        .then((user) => {
          commit('saveUser', user)

          // unlock the user and allow components to lockout as needed on mounting
          commit('unlock')

          // Only save the verification email address if user is not verified
          if (!state.currentUser.emailVerified) {
            commit('saveVerifyEmail')
          }
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
    },
    userLock ({commit}) {
      commit('lockout')
    },
    userUnlock ({commit}) {
      commit('unlock')
    },
    initiatePasswordReset ({commit}, pl) {
      return new Promise((resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(pl)
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err.code)
        })
      })
    },
    sendConfEmail ({state}) {
      return new Promise((resolve, reject) => {
        state.currentUser.sendEmailVerification().then(() => {
          resolve()
        })
        .catch((err) => {
          console.log('Error sending conf email' + err.code)
          reject()
        })
      })
    }
  },
  mutations: {
    saveUser (state, pl) {
      state.currentUser = pl
    },
    saveVerifyEmail (state) {
      state.confEmail = state.currentUser.email
    },
    removeCurrentUser (state) {
      state.currentUser = null
    },
    lockout (state) {
      state.lockout = true
    },
    unlock (state) {
      state.lockout = false
    }
  }
}
