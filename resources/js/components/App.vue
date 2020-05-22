<template>
	<div class="container">
		<navigation-component />

		<!-- route outlet -->
		<!-- component matched by the route will render here -->
		<router-view />
	</div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({ });
</script>
