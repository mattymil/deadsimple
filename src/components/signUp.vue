<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" v-model="firstName">
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" v-model="lastName">
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="passwordTry">
            </div>
            <p v-show="!lengthy" class="help is-danger">Length must be greater than seven</p>
          </div>
          <div class="field">
            <label class="label">Password (confirm)</label>
            <div class="control">
              <input class="input" type="password" v-model="passwordConfirm">
            </div>
            <p v-show="!matchy" class="help is-danger">Passwords must match</p>
          </div>
          <div class="control">
            <button @click="submit" :disabled="goodtogo" class="button is-light">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordTry: null,
      passwordConfirm: null,
      email: null, 
      firstName: null,
      lastName: null
    }
  },
  computed: {
    matchy() {
      if(this.passwordTry != null && this.passwordTry != this.passwordConfirm){
        return false
      } else {
        return true
      }
    },
    lengthy() {
      if(this.passwordTry !== null && this.passwordTry.length < 8) {
        return false
      } else {
        return true
      }
    },
    goodtogo() {
      if(this.lengthy && this.matchy){
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    submit() {
      let pl = {
        passwordTry: this.passwordTry,
        passwordConfirm: this.passwordConfirm,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.$store.dispatch('signUser', pl)
    }
  }
}
</script>
