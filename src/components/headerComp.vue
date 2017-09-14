<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item is-size-3" :to="{path: '/'}">Dead Simple</router-link>
      <div class="navbar-burger burger" @click="toggleMenu" :class="{'is-active': isactive}" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{'is-active': isactive}">
      <div class="navbar-end">
        <!-- In these router links, show or hide them based on the user context -->
        <router-link  v-on:click.native="toggleMenu" class="navbar-item" :to="{path: '/'}">Home</router-link>
        <router-link  v-on:click.native="toggleMenu" v-show="!isLoggedIn" class="navbar-item" :to="{path: '/signup'}">Signup</router-link>
        <router-link  v-on:click.native="toggleMenu" v-show="!isLoggedIn" class="navbar-item" :to="{path: '/login'}">Login</router-link>
        <router-link  v-on:click.native="toggleMenu" v-show="isLoggedIn" class="navbar-item" :to="{path: '/workspace'}">Workspace</router-link>
        <router-link  v-on:click.native="logout" v-show="isLoggedIn" class="navbar-item" :to="{path: '/login'}">Logout</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isactive: false
    }
  },
  computed: {
    isLoggedIn () {
      
      let user = this.$store.state.user.currentUser
      let lockout = this.$store.state.user.lockout
      // if user is locked out, ths should be treated as being logged out
      if(lockout || !user) {
        return false
      } 
      return true 
    }
  },
  methods: {
    // toggles the hamburger menu
    toggleMenu() {
      this.isactive = !this.isactive      
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

