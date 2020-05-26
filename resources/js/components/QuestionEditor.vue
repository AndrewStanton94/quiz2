<template>
	<section>
		<p>
			{{ question.question_order }} - {{ question.question }}
		</p>
	</section>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
	props: {
		question: {
			type: Object,
			default: ()=> ({}),
		}
	},
	async mounted() {
		console.log('mounted question editor page');
	}
});
</script>
