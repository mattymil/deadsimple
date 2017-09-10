<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{path: '/'}">Dead Simple</router-link>
      <div class="navbar-burger burger" @click="toggleMenu" :class="{'is-active': isactive}" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{'is-active': isactive}">
      <div class="navbar-end">
        <router-link  class="navbar-item" :to="{path: '/'}">Home</router-link>
        <router-link  v-show="!isLoggedIn" class="navbar-item" :to="{path: '/signup'}">Signup</router-link>
        <router-link  v-show="!isLoggedIn" class="navbar-item" :to="{path: '/login'}">Login</router-link>
        <router-link  v-show="isLoggedIn" class="navbar-item" :to="{path: '/workspace'}">Workspace</router-link>
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
      return this.$store.state.user.currentUser
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

