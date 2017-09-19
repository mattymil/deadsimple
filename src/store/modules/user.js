import firebase from 'firebase'

export default {
  state: {
    currentUser: null,
    lockout: false,
    // Cached settings are necessary because of how vuex requires form input updates
    // To do it the recommended way would require a call to FB API for each keystroke
    cachedSettings: {
      email: null,
      displayName: null
    },
    dbRef: null,
    storageRef: null,
    avatarURL: null
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
    },

    updateSettings ({state, commit}, pl) {
      return new Promise((resolve, reject) => {
        state.currentUser.updateProfile({displayName: state.cachedSettings.displayName})
        .then(() => {
          state.currentUser.updateEmail(state.cachedSettings.email)
          .then(() => {
            if (pl) {
              state.currentUser.updatePassword(pl).then(() => {
                commit('saveUser', firebase.auth().currentUser)
                resolve()
              })
            } else {
              commit('saveUser', firebase.auth().currentUser)
              resolve()
            }
          })
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    updateAvatar ({commit, state}, pl) {
      return new Promise((resolve, reject) => {
        state.storageRef.child('avatar/' + pl.name).put(pl).then((snap) => {
          state.currentUser.updateProfile({photoURL: snap.downloadURL}).then(() => {
            commit('saveUser', firebase.auth().currentUser)
            commit('cacheAvatarURL')
            resolve()
          })
        }).catch((err) => {
          reject(err.code)
        })
      })
    },
    updateCachedDisplayName ({commit}, pl) {
      commit('updateCachedDisplayName', pl)
    },
    updateCachedEmail ({commit}, pl) {
      commit('updateCachedEmail', pl)
    }
  },
  mutations: {

    saveUser (state, pl) {
      state.currentUser = pl
    },

    removeCurrentUser (state) {
      state.currentUser = null
    },

    lockout (state) {
      state.lockout = true
    },

    unlock (state) {
      state.lockout = false
    },
    cacheSettings (state) {
      state.cachedSettings.email = state.currentUser.email
      state.cachedSettings.displayName = state.currentUser.displayName
    },
    updateCachedDisplayName (state, pl) {
      state.cachedSettings.displayName = pl
    },
    updateCachedEmail (state, pl) {
      state.cachedSettings.email = pl
    },
    saveFBRefs (state, pl) {
      state.dbRef = pl.dbRef
      state.storageRef = pl.storageRef
    },
    cacheAvatarURL (state) {
      state.avatarURL = state.currentUser.photoURL
    }
  }
}
