<template>
	<section>
		<h1 class="display-4">{{ currentQuiz.quiz_name }}</h1>

		<template 
			v-for="(round, i) in rounds"
		>
			<PlayRoundComponent 
				:key="i"
				:round = "round"
				:questions = "questionsForRounds[round.round_order]"
				v-if="round.round_order === playState.round"
			/>
		</template>
		<PlayNavigationComponent />
	</section>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
	data() {
		return {
		};
	},
	computed: {
		...mapGetters({
			answersGetter: 'answer/answers',
			ownQuizzes: 'quiz/ownQuizzes',
			roundsGetter: 'round/rounds',
			questionsGetter: 'question/questions',
			playState: 'playState/playstate'
		}),
		quizId() {
			return parseInt(this.$route.params.quiz);
		},
		rounds() {
			return (this.roundsGetter[this.quizId] || [])
				.map( ({ id, quiz, round_name, round_order }) => ({
					id, quiz, round_name, round_order
				}));
		},
		currentQuiz() {
			return (
				this.ownQuizzes.find(({ id }) =>
					this.quizId === id
				)
				|| { quiz_name: 'needs hydrating' }
			);
		},
		questionsForQuiz() {
			const quiz = this.quizId;
			return (this.questionsGetter[quiz] || [])
				.map(({ id, quiz, round, question, question_order }) => ({
					 id, quiz, round, question, question_order
				}));
		},
		questionsForRounds() {
			return this.questionsForQuiz.reduce((acc, val) => {
				const roundIndex = val.round
				const foundRound = acc[roundIndex] || [];
				foundRound.push(val);
				acc[roundIndex] = foundRound;
				return acc;
			}, {});
		}
	},
	async mounted() {
		this.getAnswers(this.quizId);
		this.getRounds(this.quizId);
		this.getQuestions(this.quizId);
	},
	methods: {
		...mapActions({
			getAnswers: 'answer/get',
			getRounds: 'round/get',
			getQuestions: 'question/get',
		}),
	},
});
</script>
