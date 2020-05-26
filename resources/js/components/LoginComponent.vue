<template>
	<section>
		<h1 class="display-4">
			Login
		</h1>
		<form @submit.prevent="submit">
			<label>
				Email
				<input
					id="email"
					v-model="form.email"
					type="email"
					name="email"
				>
			</label>

			<label>
				Password
				<input
					id="password"
					v-model="form.password"
					type="password"
					name="password"
				>
			</label>

			<button type="submit">
				Login
			</button>
		</form>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
	data() {
		return {
			form: {
				email: 'me@doma.in',
				password: 'password',
			},
		};
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn',
		}),

		submit() {
			this.signIn(this.form)
				.then(() =>
					this.$router.replace({
						path: '/dashboard',
					}),
				)
				.catch((e) => console.warn(e, 'Issue with signing in'));
		},
	},
});
</script>
