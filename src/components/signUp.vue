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
          </div>
          <div class="field">
            <label class="label">Password (confirm)</label>
            <div class="control">
              <input class="input" type="password" v-model="passwordConfirm">
            </div>
          </div>
          <div class="control">
            <button @click="submit" class="button is-light">Submit</button>
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
