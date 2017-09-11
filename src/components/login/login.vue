<template>
  <section class="section">
    <login-modal v-on:closeMe="modalToggle" v-show="showResetModal"></login-modal>
    <div class="container">
      <div class="columns">
        <!-- Begin Login Form -->
        <div class="column is-half">
          <h1 id="loginTitle" class="is-size-4">Login</h1>
          <p id="loginError" v-show="showLoginError" class="is-size-5 help is-danger">Invalid Username / Password</p>
          <div class="field">
            <label class="label">Username (Email)</label>
            <div class="control has-icons-left">
              <input v-validate="'required|email'" name="email" class="input" v-model="email" type="email">
              <span class="icon is-small is-left">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <p v-show="errors.has('email:email')" class="help is-danger">Must be valid email</p>
            <p v-show="errors.has('email:required')" class="help is-danger">Username (Email) is Required</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input @keyup.enter="login" v-validate="'required'" name="password" class="input" v-model="password" type="password">
              <span class="icon is-small is-left">
                <i class="fa fa-unlock-alt"></i>
              </span>
            </div>
            <p v-show="errors.has('password:required')" class="help is-danger">Password is Required</p>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button @click="login" class="button is-light">Submit</button>
            </div>
            <div class="links control">
              <a @click="modalToggle">Forgot Password</a>
            </div>    
          </div>
        </div>
        <!-- End Login Form -->
      </div>
    </div>
  </section>
</template>

<script>
import loginModal from './loginModal.vue'

export default {
  components: {
    loginModal
  },
  data() {
    return {
      email: null,
      password: null,
      showLoginError: false,
      showResetModal: false,
      emailReset: null
    }
  },
  computed: {
    emailSentFlag () {
      return this.$store.state.user.passwordResetEmailSent
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
    },
    modalToggle () {
      this.showResetModal = !this.showResetModal
    }
  }
}
</script>

<style>
  .links {
    margin-top: 5px; 
  }
  #loginTitle {
    margin-bottom: 15px;
  }
  #loginError {
    margin-bottom: 10px;
  }
</style>


