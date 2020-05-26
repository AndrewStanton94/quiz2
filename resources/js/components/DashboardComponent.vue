<template>
	<section>
		<h1 class="display-4">
			Dashboard
		</h1>
		<button
			class="btn btn-outline-primary"
			@click="showMakeQuiz"
		>
			Make a quiz
		</button>
		<form
			v-if="makeNewQuiz"
			@submit.prevent="createQuiz"
		>
			<div class="form-group">
				<label>Quiz name
					<input
						v-model="newQuiz.name"
						class="form-control"
						type="text"
						required
					>
				</label>
			</div>
			<div class="form-group">
				<label>Date (optional)
					<input
						v-model="newQuiz.date"
						class="form-control"
						type="date"
					>
				</label>
			</div>
			<button
				type="submit"
				class="btn btn-primary"
			>
				Submit
			</button>
		</form>
		<h2>Your quizzes</h2>
		<ul>
			<li
				v-for="(quiz, i) in ownQuizzes"
				:key="i"
			>
				<router-link
					class="nav-link"
					:to="generateURL(quiz)"
				>
					{{ quiz.quiz_name }}
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
import Vue from 'vue';
import {mapGetters, mapActions } from 'vuex'

export default Vue.extend({
	data: function(){
		return {
			makeNewQuiz: false,
			newQuiz: {
				name: null,
				date: null
			}
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
			ownQuizzes: 'quiz/ownQuizzes',
		}),
	},
	methods: {
		...mapActions({
			createQuizAction: 'quiz/create'
		}),
		showMakeQuiz() {
			this.makeNewQuiz = !this.makeNewQuiz;
		},
		createQuiz() {
			this.createQuizAction(this.newQuiz);
		},
		generateURL({ id }) {
			return `/edit/${id}`
		}
	}
});
</script>
