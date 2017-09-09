<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!-- Begin Login Form -->
        <div class="column is-half">
          <h1 id="loginTitle" class="is-size-2">Login</h1>
          <p id="loginError" v-show="showLoginError" class="is-size-5 help is-danger">Invalid Username / Password</p>
          <div class="field">
            <label class="label">Username (Email)</label>
            <div class="control">
              <input v-validate="'required|email'" name="email" class="input" v-model="email" type="text">
            </div>
            <p v-show="errors.has('email:email')" class="help is-danger">Must be valid email</p>
            <p v-show="errors.has('email:required')" class="help is-danger">Username (Email) is Required</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-validate="'required'" name="password" class="input" v-model="password" type="password">
            </div>
            <p v-show="errors.has('password:required')" class="help is-danger">Password is Required</p>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button @click="login" class="button is-light">Submit</button>
            </div>
            <div id="cancelLink" class="control">
              <router-link :to="{path: '/'}">Cancel</router-link>
            </div>   
          </div>
        </div>
        <!-- End Login Form -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      showLoginError: false
    }
  },
  methods: {
    login () {
      let pl = {
        email: this.email,
        password: this.password
      }

      this.$validator.validateAll()
        .then((result) => {
          if(result) {
            this.$store.dispatch('login', pl)
          .then(() => {
            this.$router.push({path: '/workspace'})
          })
          .catch((err) => {
            console.log(err)
            this.showLoginError = true
          })
        }
      })
    }
  }
}
</script>

<style>
  #loginTitle {
    margin-bottom: 15px;
  }
  #cancelLink {
  margin-top: 5px; 
  }
  #loginError {
    margin-bottom: 10px;
  }
</style>


