<template>
	<nav
		class="py-4 form-row align-items-baseline"
	>

		<div
			class="col"
		>
			<button
				class="btn btn-block btn-primary"
				:disabled="!hasMoreQuestions"
				@click="nextQuestion"
			>
				Next
			</button>
		</div>
		<div
			class="col-md-4"
		>
			<label
				for="isMarking"
			>
				Mark
			</label>
			<input
				type="checkbox"
				id="isMarking"
				v-model="isMarking"
		>
		</div>
	</nav>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

const sortByNumericProperty = (list, property) => {
	// TODO: type check the inputs
	return list.sort((a, b) => {
		return a[property] - b[property];
	});
};

export default Vue.extend({
	data() {
		return {
		};
	},
	computed: {
		...mapGetters({
			playState: 'playState/playstate',
			roundsGetter: 'round/rounds',
			questionsGetter: 'question/questions',
		}),
		rounds () {
			const {roundsGetter, playState} = this;
			const theSalientRounds = roundsGetter[playState.quiz];
			return theSalientRounds  || [];
		},
		roundsOrdered () {
			const { round } = this.playState;
			return this.rounds.reduce((acc, cur) => {
				const ro = cur['round_order'];
				if (ro === round ) {
					acc.current = cur;
				}
				if (ro < round ) {
					acc.done.push(cur);
				}
				if (ro > round ) {
					acc.todo.push(cur);
				}
				sortByNumericProperty(acc.done, 'round_order');
				sortByNumericProperty(acc.todo, 'round_order');
				return acc;
			}, {
				done: [],
				current: null,
				todo: [],
			})
		},
		questionsFromQuiz () {
			return this.questionsGetter[this.playState.quiz] || [];
		},
		questionsFromCurrentRound () {
			return this.questionsFromRound() || [];
		},
		questionsOrdered () {
			const { question } = this.playState;
			return this.questionsFromCurrentRound.reduce((acc, cur) => {
				const qo = cur['question_order'];
				if (qo === question ) {
					acc.current = cur;
				}
				if (qo < question ) {
					acc.done.push(cur);
				}
				if (qo > question ) {
					acc.todo.push(cur);
				}
				sortByNumericProperty(acc.done, 'question_order');
				sortByNumericProperty(acc.todo, 'question_order');
				return acc;
			}, {
				done: [],
				current: null,
				todo: [],
			})
		},
		hasMoreQuestions() {
			return !! (
				this.questionsOrdered.todo.length
				|| this.roundsOrdered.todo.length
			);
		},
		isMarking: {
			get () {
				return this.playState.marking;
			},
			set (value) {
				if (value) {
					const questions = this.questionsOrdered;
					const rounds = this.roundsOrdered;
					const backTo = {
						round: rounds.current.round_order,
						question: (
							questions.done[0] || questions.current
						).question_order,
					};
					const resumeAt = {
						round: (
							// TODO: Handle the end of the quiz better
							rounds.todo[0] || rounds.current
						).round_order,
						question: 1,
					};
					this.markRound({backTo, resumeAt});
				}
				else {
					this.resumePlay();
				}
			}
		}
	},
	async mounted() {
	},
	methods: {
		...mapActions({
			incrementQuestion: 'playState/incrementQuestion',
			incrementRound: 'playState/incrementRound',
			markRound: 'playState/markRound',
			resumePlay: 'playState/resumePlay',
		}),
		questionsFromRound(roundChosen = this.playState.round) {
			return this.questionsFromQuiz.filter(
				({ round }) => round === roundChosen
			);
		},
		nextQuestion () {
			const question = this.playState.question;
			const nextQuestion =  1 + question;
			const {todo} = this.questionsOrdered;
			if (todo.length >= 1) {
				const foundQuestion = todo.find( ({ question_order }) =>
					question_order === nextQuestion
				);
				if (foundQuestion !== undefined ) {
					console.log('Need to increment question');
					this.incrementQuestion();
				} else {
					console.warn('Can\'t find the next question: ',
						nextQuestion,
						todo
					);
				}
			} else {
				console.log('No more questions in the round');
				const round = parseInt(this.playState.round);
				const nextRound =  1 + round;
				const roundsRemaining = this.roundsOrdered.todo;
				if (roundsRemaining.length >= 1) {
					const foundRound = roundsRemaining.find( ({ round_order }) => {
						console.log(parseInt(round_order), nextRound);
						return parseInt(round_order) === nextRound;
					});
					if (foundRound !== undefined ) {
						console.log('Need to increment round');
						this.incrementRound();
					} else {
						console.warn('Can\'t find next round');
					}
				} else {
					console.warn('No more rounds');
				}
			}
		}
	},
});
</script>
