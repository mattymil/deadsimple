<template>
	<div class="section">
		<div class="container">
			<div class="columns">
				<div class="column is-half">
					<h3 id="settingsTitle" class="is-size-3">Settings</h3>
					<div class="field">
						<label class="label">Display Name</label>
						<div class="control">
							<input v-model="displayName" class="input" v-validate="'required'" name="displayName" type="text" >
						</div>
						<p class="help is-danger" v-show="errors.has('displayName')">Display Name Required</p>
					</div>
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input v-model="email" v-validate="'required|email'" name="email" class="input" type="text">
						</div>
						<p class="help is-danger" v-show="errors.has('email:required')">Email is required</p>
						<p class="help is-danger" v-show="errors.has('email:email')">Must be a valid email</p>

					</div>
					<div class="field is-grouped">
						<div class="control">
							<button class="button is-light" @click="updateSettings">Save</button>
						</div>
						<div id="cancelLink" class="control">
							<router-link :to="{path: '/'}">Cancel</router-link>
						</div>
					</div>
					<div  v-show="!emailSent" class="field">
						<div class="control">
							<button @click="passwordReset" class="button is-light">Initiate Password Change</button>
						</div>
					</div>
					<p v-show="emailSent"><strong>Password Change: </strong>Password change email has been sent successfully. Please check your inbox and follow the instructions to change your password.</p>			
				</div>			
			</div>
		</div>
	</div>

</template>

<script>
export default {
	computed: {
		mounted () {
			this.displayName = this.$store.state.user.currentUser.displayName,
			this.email = this.$store.state.user.currentUser.email
		},
		data() {
			return {
				displayName: null,
				email: null
			}
		}
	},
	methods: {
		passwordReset () {
			this.$store.dispatch('initiatePasswordReset', this.email)
		},
		updateSettings () {
			
			console.log(this.email)
		}
	}
}
</script>

<style>
#settingsTitle {
	margin-bottom: 10px;
}
#cancelLink {
	margin-top: 5px;
}
</style>
