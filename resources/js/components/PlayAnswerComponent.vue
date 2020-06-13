<template>
	<section>
		<p>{{ question.question_order }}-{{ question.question }}</p>
		<div class="form-row">
			<div
				class="col"
			>
				<label
					:for="questionElemId"
				>
					Answer
				</label>
				<input
					:id="questionElemId"
					:disabled="playState.marking"
					v-model="answer"
					class="form-control"
					@blur="saveAnswer"
				>
			</div>
			<div
				v-if="playState.marking"
				class="col-md-4"
			>
				<label
					:for="scoreElemId"
				>
					Score
				</label>
				<input
					:id="scoreElemId"
					v-model="score"
					class="form-control"
					@blur="saveAnswer"
				>
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
	props: {
		question: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			answer: '',
			startingAnswer: '',
			score: '',
			startingScore: '',
			id: '',
			questionElemId: this.$id('answer'),
			scoreElemId: this.$id('score'),
		};
	},
	computed: {
		...mapGetters({
			answers: 'answer/answers',
			playState: 'playState/playstate',
		}),
		answerData() {
			return {
				id: this.id,
				quiz: this.question.quiz,
				round: this.question.round,
				question: this.question.question_order,
				answer: this.answer,
				score: this.score
			};
		}
	},
	watch: {
		answers: {
			handler: function(newValue, oldValue) {
				const { quiz } = this.question;
				const { answers } = this;

				const answersFromQuiz = answers[quiz] || [];
				const ans = answersFromQuiz.filter( ({ question, round }) =>
					question === this.question.question_order
					&& round === this.question.round
				)[0];
				if (ans) {
					this.answer = ans.answer;
					this.startingAnswer = ans.answer;
					this.id = ans.id;
					this.score = ans.score;
				}
			},
			immediate: true,
		}
	},
	async mounted() {
	},
	methods: {
		...mapActions({
			createAnswer: 'answer/create',
			updateAnswer: 'answer/update'
		}),
		saveAnswer() {
			const {
				answerData,
				id,
				answer,
				startingAnswer,
				score,
				startingScore
			} = this;

			console.log(answerData);
			if (id) {
				if (
					(answer !== startingAnswer )
					|| (score !== startingScore )
				){
					console.log('PATCH');
					this.updateAnswer(answerData);
				} else {
					console.log('no change');
				}
			} else {
				console.log('POST');
				this.createAnswer(answerData);
			}
		}
	},
});
</script>
