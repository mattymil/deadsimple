<template>
  <div>
    <!-- Begin Password Reset Modal -->
    <div class="modal is-active">
      <div class="modal-background" @click="closeMe"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Password Reset</p>
            <button @click="closeMe" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <!-- Submit email message -->
            <div v-show="!emailSentFlag && !emailErrorFlag">
              <p> Please enter the email associated with your Dead Simple Notes account and click submit. An email containing instructions on how to reset your password will be sent shortly.</p>
              <div class="field" id="emailResetField">
                <div class="control has-icons-left">
                  <input v-validate="'required|email'" name="emailReset" class="input" v-model="emailReset" type="email">
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
                <p v-show="errors.has('emailReset:email')" class="help is-danger">Must be valid email</p>
                <p v-show="errors.has('emailReset:required')" class="help is-danger"> Email is Required</p>
              </div>
            </div>
            <!-- End Submit Email Message -->
            <!-- Email submit Confirmation Message -->
            <div v-show="emailSentFlag">
              <p>Thank you for your submission, your email has been sent. Please check your email and follow the instructions to reset your password, then click <a @click="closeMe">here</a> to login. If you didn't receive the email, click <a @click="tryEmailAgain">here</a> to resend.</a></p>
            </div>
            <!-- End Email submit Confirmation Message -->
            <!-- Email Error Message -->
            <div v-show="emailErrorFlag">
              <h1 class="is-size-4">Error</h1>
              <p>Your email was not found, please verify your email and click <a @click="tryEmailAgain">here</a> to try again</p>
            </div>
            <!-- End Email Error Message -->
          </section>
          <footer class="modal-card-foot">
            <div class="field is-grouped" v-show="!emailSentFlag && !emailErrorFlag">
              <div class="control">
                <button @click="submitPwdReset" class="button">Submit</button>
              </div>
              <div id="cancelLink" class="control">
                <a @click="closeMe">Cancel</a>
              </div>             
            </div> 
          </footer>
        </div>
      </div>
      <button class="modal-close is-large is-active is-light" aria-label="close"></button>
    </div>
    <!-- End Password Reset Modal  -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailSentFlag: false,
      emailErrorFlag: false
    }
  },
  methods: {
    submitPwdReset () {
      this.$validator.validateAll()
      .then((result) => {
        if(result) {
          this.$store.dispatch('initiatePasswordReset', this.emailReset)
          .then(() => {
            this.emailSentFlag = true
          }).catch(() => {
            this.emailErrorFlag = true
          })
        }
      })
    },
    closeMe () {
      this.$emit('closeMe')
    },
    tryEmailAgain () {
      this.emailErrorFlag = false
      this.emailSentFlag = false
    }
  }
}
</script>

<style>
  #emailResetField {
    margin-top: 10px;
  }
  #cancelLink {
    margin-top: 5px;
  }
</style>

