<template>
	<section>
		<div class="container">
			Hello {{ bundler }}
		</div>
		<navigation-component />

		<!-- route outlet -->
		<!-- component matched by the route will render here -->
		<router-view />
	</section>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			bundler: 'Parcel',
		};
	},
});
</script>
