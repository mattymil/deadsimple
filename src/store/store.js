import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import {db} from '../config/db.js'
import {storage} from '../config/db.js'
import user from './modules/user.js'
import currentNote from './modules/current-note.js'
import notes from './modules/notes.js'
import notebooks from './modules/notebooks.js'
import tags from './modules/tags.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    user,
    currentNote,
    notes,
    notebooks,
    tags
  },
  state: {},
  mutations: {},
  actions: {

    initializeStore ({commit, state}) {
      return new Promise((resolve) => {
        commit('saveUser', firebase.auth().currentUser)
        commit('cacheSettings')
        let storageRef = storage.ref(state.user.currentUser.uid)
        let dbRef = db.ref(state.user.currentUser.uid)

        let pl = {
          storageRef,
          dbRef
        }
        commit('saveFBRefs', pl)
        commit('cacheAvatarURL')
        resolve()
      })
    }
  }
})

