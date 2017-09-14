// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import store from './store/store'
import home from './components/home.vue'
import signup from './components/signUp.vue'
import login from './components/login/login.vue'
import workspace from './components/workspace.vue'
import emailConf from './components/emailConf.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VeeValidate)

const routes = [
  {path: '/', component: home},
  {path: '/signup', component: signup},
  {path: '/login', component: login},
  {
    path: '/emailconf',
    component: emailConf,
    // To prevent users from finding a broken email conf page
    // via page refresh check to see if the confEmail property exists.
    beforeEnter: (to, from, next) => {
      if (store.state.user.currentUser) {
        next()
      } else {
        next({path: '/login'})
      }
    }
  },
  {
    path: '/workspace',
    component: workspace,
    beforeEnter: (to, from, next) => {
      // This if block will prevent user from accessing workspace if not logged in
      // or if email is not verified. In the case of unverified email, the user will be
      // referred to the emailconf page
      if (store.state.user.currentUser.emailVerified) {
        next()
      } else if (!store.state.user.currentUser.emailVerified) {
        next({path: '/emailconf'})
      } else {
        next({path: '/login'})
      }
    }
  }
]

// Since the store is flushed on hard refresh this function provides
// a delay while firebase initializes and obtains current auth state and
// it is loaded into the store.
firebase.auth().onAuthStateChanged(() => {
  store.dispatch('initializeStore').then(() => {
    const router = new VueRouter({
      routes
    })

    new Vue({ // eslint-disable-line no-new
      el: '#app',
      store,
      router,
      render: (h) => h(App)
    })
  })
})
