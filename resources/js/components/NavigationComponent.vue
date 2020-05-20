<template>
<nav>
	<template v-if="authenticated">
		<router-link to="/">Home</router-link>
		<router-link to="/dashboard">Dashboard</router-link>
		{{ user.name }}
		<a href="#">Sign out</a>
	</template>
	<template v-else>
		<router-link to="/login">Login</router-link>
	</template>
</nav>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				authenticated: 'auth/authenticated',
				user: 'auth/user',
			})
		}
	}
</script>
