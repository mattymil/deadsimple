<template>
  <!-- Error message for duplicate email -->
  <div class="section">
    <article class="message is-warning" :class="{'hide': !showEmailErrorMessage}">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete" @click="closeEmailErrorMenu"></button>
      </div>
      <div class="message-body">
        <p>The email address you have provided has already been associated with a Dead Simple Notes user account. Please choose another email or attempt to recover your password <router-link :to="{path: '/'}">here</router-link>.</p>
      </div>
    </article>
    <!-- End Error Message -->
    <!-- Sign Up Form -->
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
          <div class="field is-grouped">
            <div class="control">
              <button @click="submit" class="button is-light">Submit</button>
            </div>
            <div id="cancelLink" class="control">
              <router-link :to="{path: '/'}">Cancel</router-link>
            </div>   
          </div>    
        </div>
      </div>
    </div>
    <!-- End sign up form -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: null,
      passwordConfirm: null,
      email: null, 
      firstName: null,
      lastName: null,
      showEmailErrorMessage: false
    }
  },
  methods: {
    closeEmailErrorMenu () {
      this.showEmailErrorMessage = false
    },
    submit () {
      this.$validator.validateAll().then((result) => {
         
         // will only proceed if result is true. Otherwise, at inocation helper messages
         // will appear at field level for any validation errors.
         if(result) {
           let pl = {
             password: this.password,
             passwordConfirm: this.passwordConfirm,
             email: this.email,
             firstName: this.firstName,
             lastName: this.lastName
           }

          this.$store.dispatch('signUpUser', pl).then(() => {
            this.$router.push({path: 'login'})
          }, (err) => {
            // If error this indicates email already in use. 
            //Accordingly, set error message flag to trigger UI message
              this.showEmailErrorMessage = true                  
          })
        }
      })
    }
  }
}
</script>

<style>
.hide {
  display: none;
}
#signuptitle {
  margin-bottom: 15px;
}
#cancelLink {
  margin-top: 5px; 
}
</style>

