<template>
	<section>
		<h2>
			{{ round.round_name }}
		</h2>
		<template
			v-for="(question, i) in questions"
		>
			<PlayAnswerComponent
				v-if="question.question_order === playState.question"
				:key="i"
				:question="question"
			/>
		</template>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
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
	data() {
		return { };
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
