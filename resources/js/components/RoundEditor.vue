<template>
	<section class="mb-5 border-bottom pb-3">
		<header class="p-3 bg-info">
			<div class="row">
				<h2
					class="col-md-8"
				>
					{{ round.round_order }} -
					<span 
						class="d-inline"
						:contenteditable="canRenameRound"
						:class="{ 'form-control' : canRenameRound }"
						@blur="captureNewName($event)"
					>
						{{ round.round_name }}
					</span>
				</h2>
				<button
					class="col mr-md-5 btn btn-info"
					@click="toggleRenameRound"
				>
					Rename round
				</button>
			</div>
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
			canRenameRound: false,
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
			renameRound: 'round/rename',
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
		toggleRenameRound() {
			const currentState = this.canRenameRound;
			if (currentState) {
				this.renameRound(this.round);
			}

			this.canRenameRound = !currentState;
		},
		captureNewName(e) {
			this.round.round_name = e.target.innerText;
		}
	},
});
</script>
