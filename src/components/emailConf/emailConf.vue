<template>
<div>
	<email-conf-success-modal v-show="sentMessage" v-on:closeMe="closeSuccess"></email-conf-success-modal>
	<email-conf-fail-modal v-show="sendErrorMessage" v-on:closeMe="closeFail"></email-conf-fail-modal>
	<div class="section">
		<div class="container">
			<div class="columns">
				<div class="column">
					<h1 id="title" class="is-size-4">You're almost there!</h1>
					<p>We sent an email to <strong>{{email}}</strong> with a link to verify this address. To complete the sign up process and gain access to Dead Simple Notes, please locate the email and click on the link. Once complete you may login to the app <router-link :to="{path: '/login'}">here.</router-link></p>
					<p id="resendPar">Haven't received your email? Click <a @click="resendConfEmail">here</a> to send it again.</p>
				</div>
			</div>
		</div>   
	</div>
</div>  
</template>
<script>
import emailConfSuccessModal from './emailConfSuccesModal.vue'
import emailConfFailModal from './emailConfFailModal.vue'

export default {
	mounted () {
			this.$store.dispatch('userLock')
	},
	components: {
		emailConfSuccessModal,
		emailConfFailModal
	},
	data () {
		return {
			email: this.$store.state.user.currentUser.email,
			sentMessage: false,
			sendErrorMessage: true	
		}
	},
	methods: {
		resendConfEmail () {
			this.$store.dispatch('sendConfEmail')
			.then(() => {
				this.sentMessage = true
			}).catch(() => {
				this.sendErrorMessage = true
			})
		},
		closeSuccess () {
			this.sentMessage = false
		},
		closeFail () {
			this.sendErrorMessage = false
		}
	}
}
</script>

<style>
	#title {
		margin-bottom: 10px;
	}
	#codeInput {
		margin-top: 10px;
	}
	#codeField {
		width: 300px;
	}
	#resendPar {
		margin-top: 10px
	}
</style>
