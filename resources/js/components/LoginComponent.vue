<template>
	<section>
		<h1 class="display-4">
			Login
		</h1>
		<div class="row">
			<form
				class="col"
				@submit.prevent="submitLogin"
			>
				<div
					class="form-group"
				>
					<label
						for="login-email"
					>
						Email
					</label>
					<input
						id="login-email"
						class="form-control"
						type="email"
						name="email"
						autocomplete="email"
						v-model="loginForm.email"
					>
				</div>

				<div
					class="form-group"
				>
					<label
						for="login-password"
					>
						Password
					</label>
					<input
						id="login-password"
						class="form-control"
						type="password"
						name="password"
						autocomplete="current-password"
						v-model="loginForm.password"
					>
				</div>

				<button
					type="submit"
					class="btn btn-primary"
				>
					Login
				</button>
			</form>


			<form
				class="col"
				@submit.prevent="registerUser"
			>
				<div
					class="form-group"
				>
					<label
						for="register-email"
					>
						Email
					</label>
					<input
						id="register-email"
						class="form-control"
						type="email"
						name="email"
						autocomplete="email"
						v-model="registerForm.email"
					>
				</div>

				<div
					class="form-group"
				>
					<label
						for="register-name"
					>
						Name
					</label>
					<input
						id="register-name"
						class="form-control"
						name="email"
						autocomplete="username"
						v-model="registerForm.name"
					>
				</div>

				<div
					class="form-group"
				>
					<label
						for="register-password"
					>
						Password
					</label>
					<input
						id="register-password"
						class="form-control"
						type="password"
						name="password"
						autocomplete="new-password"
						v-model="registerForm.password"
					>
				</div>

				<button
					type="submit"
					class="btn btn-primary"
				>
					Register
				</button>

				<div
					class="mt-3 alert alert-primary"
					v-if="Object.keys(registeredUser).length"
				>
					Registered. Please log in
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import axios from 'axios';

export default Vue.extend({
	data() {
		return {
			loginForm: {
				email: 'me@doma.in',
				password: 'password',
			},
			registerForm: {
				email: '',
				name: '',
				password: '',
			},
			registeredUser: {},
		};
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn',
		}),

		submitLogin() {
			this.signIn(this.loginForm)
				.then(() =>
					this.$router.replace({
						path: '/dashboard',
					}),
				)
				.catch((e) => console.warn(e, 'Issue with signing in'));
		},

		async registerUser() {
			try {
				const {data} = await axios.post('auth/register', this.registerForm);
				this.registeredUser = data;
			} catch(e) {
				console.log(e.data);
			}
		}
	},
});
</script>
