<template>
	<section class="mb-5 border-bottom pb-3">
		<header class="p-3 bg-info">
			<h2>{{ round.round_order }} - {{ round.round_name }}</h2>
			<div class="row align-items-baseline">
				<p class="col-md-8">
					{{ questionsForRound.length }} questions
				</p>
				<button
					class="col mr-md-5 btn btn-outline-info bg-white"
					@click="toggleNewQuestion"
				>
					Add question
				</button>
			</div>
		</header>
		<form
			v-if="showNewQuestion"
			class="p-4"
			@submit.prevent="makeNewQuestion"
		>
			<div class="form-row">
				<div class="col-md-8">
					<div class="form-group">
						<label for="question">Question</label>
						<input
							id="question"
							v-model="newQuestion.question"
							class="form-control"
							required
						>
					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label for="questionOrder">Question order</label>
						<input
							id="questionOrder"
							v-model="newQuestion.question_order"
							class="form-control"
							type="number"
						>
					</div>
				</div>
			</div>
			<button
				type="submit"
				class="btn btn-primary"
			>
				New question
			</button>
		</form>
		<div class="p-4">
			<QuestionEditor
				v-for="(question, i) in questionsForRound"
				:key="i"
				:question="question"
			/>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
	props: {
		round: {
			type: Object,
			default: ()=> ({}),
		},
	},
	data() {
		return {
			showNewQuestion: false,
			newQuestion: {
				question: '',
				question_order: 0,
			},
		};
	},
	computed: {
		...mapGetters({
			questionsGetter: 'question/questions',
		}),
		questionsForQuiz() {
			const { quiz } = this.round;
			return this.questionsGetter[quiz] || [];
		},
		questionsForRound() {
			const { round_order } = this.round;
			return this.questionsForQuiz.filter(
				({ round }) => round === round_order,
			);
		},
	},
	methods: {
		...mapActions({
			newQuestionAction: 'question/create',
		}),
		toggleNewQuestion() {
			this.newQuestion.question_order = this.questionsForRound.length + 1;
			this.showNewQuestion = !this.showNewQuestion;
		},
		makeNewQuestion() {
			const { quiz, round_order } = this.round;

			this.newQuestionAction({
				quiz,
				round: round_order,
				...this.newQuestion,
			}).then(() => {
				this.newQuestion = {
					question: '',
					question_order: this.newQuestion.question_order + 1,
				};
			});
		},
	},
});
</script>