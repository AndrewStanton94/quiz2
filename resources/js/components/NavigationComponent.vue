<template>
	<nav class="nav">
		<template v-if="authenticated">
			<router-link
				class="nav-link"
				to="/"
			>
				Home
			</router-link>
			<router-link
				class="nav-link"
				to="/dashboard"
			>
				Dashboard
			</router-link>
			<div class="nav-link">
				{{ user.name }}
			</div>
			<div class="nav-link">
				<a
					href="#"
					@click.prevent="signOut"
				>Sign out</a>
			</div>
		</template>
		<template v-else>
			<router-link
				class="nav-link"
				to="/login"
			>
				Login
			</router-link>
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
		}),
	},
	methods: {
		...mapActions({
			signOutAction: 'auth/signOut',
		}),
		signOut() {
			this.signOutAction().then(() => {
				if (this.$route.path !== '/') {
					this.$router.replace({
						path: '/',
					});
				}
			});
		},
	},
};
</script>
