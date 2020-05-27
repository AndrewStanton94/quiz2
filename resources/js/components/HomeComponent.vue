<template>
	<section>
		<h1 class="display-4">
			Home
		</h1>
		<p>A quiz app. Built with VueJS and Laravel. Go to the dashboard to create quizzes.</p>
		<h2>Quizzes to play</h2>
		<ul>
			<li
				v-for="(quiz, i) in othersQuizzes"
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
import {mapGetters } from 'vuex';

export default Vue.extend({
	computed: {
		...mapGetters({
			othersQuizzes: 'quiz/othersQuizzes',
		})
	},
	methods: {
		generateURL({ id }) {
			return `/play/${id}`
		}
	}
});
</script>
