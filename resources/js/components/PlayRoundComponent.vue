<template>
	<section>
		<h2>
			{{ round.round_name }}
		</h2>
		<template
			v-for="(question, i) in questions"
		>
			<PlayAnswerComponent
				:key="i"
				:question="question"
				v-if="question.question_order === playState.question"
			/>
		</template>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
	data() {
		return { };
	},
	props: {
		round: {
			type: Object,
			default: () => ({}),
		},
		questions: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		...mapGetters({ 
			playState: 'playState/playstate'
		}),
	},
	async mounted() { },
	methods: {
		...mapActions({
			saveAnswer: 'answer/create'
		}),
	},
});
</script>
