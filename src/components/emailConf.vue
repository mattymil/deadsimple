<template>
	<div>
		<message-modal v-show="sentMessage" :header="'Success!'" :message="successMessage" v-on:closeMe="closeSuccess"></message-modal>
		<message-modal v-show="sendErrorMessage" :message="errorMessage" v-on:closeMe="closeFail"></message-modal>
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
import messageModal from './messageModal.vue'

export default {
	mounted () {
			// If the user has arrived here, we need to lock them out since 
			// we still hold the user object from authenitication
			this.$store.dispatch('userLock')
	},
	components: {
		messageModal
	},
	data () {
		return {
			email: this.$store.state.user.currentUser.email,
			sentMessage: false,
			sendErrorMessage: false,
			// this could be done better. The anchor should be a router link, however
			// vue has trouble parsing components dumped from  a v-html directive
			successMessage: '<p>Your email has been sent. Check your inbox and follow the instructions to enable your Dead Simple Notes account. When complete, login <a href="/#/login">here.</a></p>',
			errorMessage: 	'<p>An error has occurred and your email has not been sent. Please contact <a href="mailto:support@digitalvecte.com">our support team</a> for resolution.</p>'	
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
