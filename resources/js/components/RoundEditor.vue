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
				<span
					class="col d-inline"
				>
					<button
						class="btn btn-info"
						@click="toggleRenameRound"
					>
						Rename round
					</button>
					<button
						class="btn btn-danger"
						:disabled="questionsForRound.length > 0"
						@click="deleteRound"
					>
						Delete round
					</button>
				</span>
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
							v-model.number="newQuestion.question_order"
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
import {sortObjectListByKey} from '../utils.js';

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
			const roundQuestions = this.questionsForQuiz.filter(
				({ round }) => round === round_order,
			);
			return sortObjectListByKey(
				roundQuestions,
				'question_order'
			);
		},
		nextQuestionNumber() {
			const questionOrder = this.questionsForRound.map(
				({question_order}) => question_order
			);
			console.log(questionOrder)

			// Covers the empty and missing 1 edge cases
			if (!questionOrder.includes(1)) {
				return 1;
			}

			const maxQuestion = Math.max(...questionOrder);
			const hasGaps = maxQuestion !== questionOrder.length;
			const firstGap = (questions) =>
				questions.find((question, i, arr) =>
				// Next value that isn't one more than the current
					i + 1 <= arr.length
					&& question + 1 !== arr[i + 1]
				) + 1;

			return hasGaps ?
				firstGap(questionOrder)
				: maxQuestion + 1;
		},
	},
	methods: {
		...mapActions({
			newQuestionAction: 'question/create',
			renameRound: 'round/rename',
			deleteRoundAction: 'round/deleteRound',
		}),
		toggleNewQuestion() {
			this.newQuestion.question_order = this.nextQuestionNumber;
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
					question_order: this.nextQuestionNumber,
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
		},
		deleteRound() {
			console.log('Delete', this.round);
			if (this.questionsForRound.length) {
				console.warn('Can\'t delete a round that still has questions');
			} else {
				this.deleteRoundAction(this.round.id);
			}
		}
	},
});
</script>
