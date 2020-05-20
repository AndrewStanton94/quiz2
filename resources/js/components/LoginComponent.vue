<template>
<section>
	<h1>Login</h1>
	<form @submit.prevent="submit">
		<label>
			Email
			<input type="email" name="email" id="email" v-model="form.email">
		</label>

		<label>
			Password
			<input type="password" name="password" id="password" v-model="form.password">
		</label>

		<button type="submit">Login</button>
	</form>
</section>
</template>

<script>
	import Vue from "vue";
	import { mapActions } from 'vuex';

	export default Vue.extend({
		methods: {
			...mapActions({
				signIn: 'auth/signIn'
			}),

			submit() {
				this.signIn(this.form)
				.then(() =>
					this.$router.replace({
						path: '/dashboard'
					})
				).catch((e) => console.warn(e, 'Issue with signing in'));
			}
		},
		data() {
			return {
				form: {
					email: 'me@doma.in',
					password: 'password',
				}
			};
		}
	});
</script>
