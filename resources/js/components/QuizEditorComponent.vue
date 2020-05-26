<template>
	<section>
		<h1> {{ currentQuiz.quiz_name }} </h1>
		<round-editor v-for="(round, i) in rounds" :round="round" :key="i" />
		<div class="row align-items-baseline">
			<p class="col-8">{{howManyRounds}} rounds</p>
			<button class="col btn btn-primary" @click="toggleNewRound">New round</button>
		</div>
		<form class="pb-4" @submit.prevent="makeNewRound" v-if="showNewRound">
			<div class="form-group">
				<label for="roundName">Round name</label>
				<input id="roundName" class="form-control" v-model="newRound.round_name" required />
			</div>
			<div class="form-group">
				<label for="roundOrder">Round order</label>
				<input id="roundOrder" class="form-control" type="number" v-model="newRound.round_order" />
			</div>
			<button type="submit" class="btn btn-primary">New round</button>
		</form>
	</section>
</template>

<script>
	import Vue from 'vue';
	import {mapGetters, mapActions } from 'vuex'

	export default Vue.extend({
		data() {
			return {
				showNewRound: false,
				newRound: {
					round_name: '',
					round_order: 0,
				}
			};
		},
		computed: {
			...mapGetters({
				ownQuizzes: 'quiz/ownQuizzes',
				roundsGetter: 'round/rounds'
			}),
			quizId(){
				return parseInt(this.$route.params.quiz);
			},
			rounds(){
				return this.roundsGetter[this.quizId];
			},
			howManyRounds(){
				const { rounds } = this;
				return rounds && parseInt(rounds.length) || 0;
			},
			currentQuiz(){
				return this.ownQuizzes.find(({id}) =>
					this.quizId === id
				) || { quiz_name: 'needs hydrating'};
			}
		},
		methods: {
			...mapActions({
				getRounds: 'round/get',
				getQuestions: 'question/get',
				newRoundAction: 'round/create'
			}),
			toggleNewRound() {
				this.newRound.round_order = this.howManyRounds + 1;
				this.showNewRound = !this.showNewRound;
			},
			makeNewRound() {
				this.newRoundAction({
					...this.newRound,
					quiz: this.quizId
				}).then(() => {
					this.newRound = {
						round_name: '',
						round_order: this.newRound.round_order + 1,
					}
				});
			}
		},
		async mounted() {
			console.log('mounted editor page');
			this.getRounds(this.quizId);
			this.getQuestions(this.quizId);
		},
	});
</script>
