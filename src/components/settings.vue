<template>
	<div>
		<message-modal v-show="showErrMessage" :message="errMessage" :header="'Error'" v-on:closeMe="closeModal"></message-modal>
		<div class="section">
			<div class="container">
				<div class="columns">
					<div class="column is-half">
						<h3 id="settingsTitle" class="is-size-3">Settings</h3>
						<clickable-avatar id="avatar"  v-on:imageUpdated="uploadAvatarImage" :size="96" :url="avatarUrl" :fullname="avatarFullName"></clickable-avatar>
						<div class="field">
							<label class="label">Display Name</label>
							<div class="control">
								<input @input="updateDisplayName" :value="displayName" class="input" v-validate="'required'" name="displayName" type="text">
							</div>
							<p class="help is-danger" v-show="errors.has('displayName')">Display Name Required</p>
						</div>
						<div class="field">
							<label class="label">Email</label>
							<div class="control">
								<input @input="updateEmail" :value="email" v-validate="'required|email'" name="email" class="input" type="text">
							</div>
							<p class="help is-danger" v-show="errors.has('email:required')">Email is required</p>
							<p class="help is-danger" v-show="errors.has('email:email')">Must be a valid email</p>
						</div>
						<div class="control">
								<button class="button is-light" @click="showNewPassword">{{passwordMessage}}</button>
							</div>
						<div id="passwordField" v-show="showNewPasswordField" class="field">
							<label class="label">New Password</label>
							<div class="control">
								<input v-model="newPassword" v-validate="'required|min:8'" name="password" class="input" type="password">
							</div>
							<p class="help is-danger" v-show="errors.has('password')">Length must be greater than seven</p>
						</div>
							<p class="help is-success" v-show="successfulUpdate">Updated Succesfully</p>
						<div id="buttons" class="field is-grouped">
							<div class="control">
								<button class="button is-light" @click="updateSettings">Save</button>
							</div>
							<div id="cancelLink" class="control">
								<router-link :to="{path: '/'}">Cancel</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import {mapState} from 'vuex'
	import messageModal from './messageModal.vue'
	import clickableAvatar from './clickableAvatar.vue'

	export default {
		data () {
			return {
				newPassword: null,
				successfulUpdate: false,
				showNewPasswordField: false,
				passwordMessage: 'Change Password',
				errMessage: null,
				showErrMessage: false
			}
		},
		computed: mapState({
			displayName: state => state.user.cachedSettings.displayName,
			email: state => state.user.cachedSettings.email,
			avatarFullName: state => state.user.currentUser.displayName,
			avatarUrl: state => state.user.avatarURL
		}),
		components: {
			messageModal: messageModal,
			clickableAvatar: clickableAvatar
		},
		methods: {
			updateEmail (e) {
				this.$store.dispatch('updateCachedEmail', e.target.value)
			},
			updateDisplayName (e) {
				this.$store.dispatch('updateCachedDisplayName', e.target.value)
			},
			updateSettings() {

				this.$validator.validateAll().then((result) => {
					
					// will only proceed if result is true. Otherwise, at inovcation helper messages
         // will appear at field level for any validation errors.
					if(result) {
						this.$store.dispatch('updateSettings', this.newPassword)
						.then(() => {
							this.successfulUpdate = true
							this.showNewPasswordField = false
							setTimeout(() => {
								this.successfulUpdate = false
							}, 5000)
						})
						.catch((err) => {
							// handle errors
							switch (err.code) {
								case 'requires-recent-login':
									this.errMessage = '<p>Resetting email or passwords is a sensitive operation. It looks like you have been logged in for too long to allow this to complete. Please log out, log back in, and try again</p>',
									this.showErrMessage = true
									break
								case 'email-already-in-use':
									this.errMessage = "<p>The email you are attempting to change to is already associated with a Dead Simple Notes account. Please choose another email or login to the account associated with that email.</p>"
									this.showErrMessage = true
							}
						})
					}
				})
			},
			showNewPassword () {
				this.showNewPasswordField = ! this.showNewPasswordField
				switch (this.showNewPasswordField) {
					case true: 
						this.passwordMessage = 'Cancel Password Change'
						break
					case false: 
						this.passwordMessage = "Change Password"
						this.newPassword = null
						break
				}
			},
			closeModal () {
				this.showErrMessage = false
			},
			uploadAvatarImage (pl) {
				this.$store.dispatch('updateAvatar', pl).then(()=> {
				}).catch((err) => {
					console.log(err)
				}) 
			}
		}
	}
</script>

<style>
	#avatar {
		margin-bottom: 10px;
	}
	#settingsTitle {
		margin-bottom: 10px;
	}
	
	#cancelLink {
		margin-top: 5px;
	}
	#buttons {
		margin-top: 10px;
	}
	#passwordField {
		margin-top: 10px;
	}
</style>
