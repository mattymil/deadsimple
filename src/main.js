// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store/store'
import hello from './components/Hello.vue'
//import login from './components/login.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  // {path: '/login', component: login},
  {path: '/hello', component: hello}
  /* {
    path: '/workspace',
    component: workspace,
    beforeEnter: (to, from, next) => {
      if (firebase.auth().currentUser) {
        next()
      } else {
        next({path: '/login'})
      }
    }
  }*/
]

// Timeout to allow firebase currentUser to load before evaluating routes
setTimeout(() => {
  const router = new VueRouter({
    routes
  })

  new Vue({ // eslint-disable-line no-new
    el: '#app',
    store,
    router,
    render: (h) => h(App)
  })
}, 300)
