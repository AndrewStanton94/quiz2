<template>
<nav>
	<template v-if="authenticated">
		<router-link to="/">Home</router-link>
		<router-link to="/dashboard">Dashboard</router-link>
		{{ user.name }}
		<a href="#" @click.prevent="signOut">Sign out</a>
	</template>
	<template v-else>
		<router-link to="/login">Login</router-link>
	</template>
</nav>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				authenticated: 'auth/authenticated',
				user: 'auth/user',
			})
		},
		methods: {
			...mapActions({
				signOutAction: 'auth/signOut'
			}),
			signOut() {
				this.signOutAction().then(() => {
					this.$router.replace({
						path: '/'
					});
				});
			}
		}
	}
</script>
