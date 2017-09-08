<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <h1 id="signuptitle" class="is-size-2">Sign up!</h1>
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input v-validate="'required'" name="firstName" class="input" type="text" v-model="firstName">
            </div>
            <p v-show="errors.has('firstName')" class="help is-danger">First Name Required</p>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input v-validate="'required'" name="lastName" class="input" type="text" v-model="lastName">
            </div>
            <p v-show="errors.has('lastName')" class="help is-danger">Last Name Required</p>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-validate="'required|email'" data-vv-delay="500" name="email" class="input" type="email" v-model="email">
            </div>
             <p v-show="errors.has('email')" class="help is-danger">Must be valid email</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-validate="'required|min:8'" name="password" class="input" type="password" v-model="password">
            </div>
            <p v-show="errors.has('password:min')" class="help is-danger">Length must be greater than seven</p>
            <p v-show="errors.has('password:required')" class="help is-danger">Password is required</p>
          </div>
          <div class="field">
            <label class="label">Password (confirm)</label>
            <div class="control">
              <input v-validate="'required|confirmed:password'" name="passwordConfirm" class="input" type="password" v-model="passwordConfirm">
            </div>
            <p v-show="errors.has('passwordConfirm:confirmed')" class="help is-danger">Passwords must match</p>
            <p v-show="errors.has('passwordConfirm:required')" class="help is-danger">Confirmation password is required</p>
          </div>
          <div class="control">
            <button @click="submit" :disabled="goodtogo" class="button is-light">Submit</button>
            <a @click="submit" :disabled="!goodtogo" >Cancel</a>
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
        password: this.passwordTry,
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

<<style>
#signuptitle {
  margin-bottom: 15px;
}
</style>

