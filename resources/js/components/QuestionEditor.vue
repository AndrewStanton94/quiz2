<template>
	<section class="row">
		<p class="col-md-8">
			{{ question.question_order }} - {{ question.question }}
		</p>
		<div class="col">
			<button
				class="btn btn-danger"
				data-toggle="modal"
				data-target="#deleteModal"
				@click="deleteQuestion"
			>
				Delete question
			</button>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
	props: {
		question: {
			type: Object,
			default: ()=> ({}),
		}
	},
	async mounted() {
		console.log('mounted question editor page');
	},
	methods: {
		...mapActions({
			deleteFromStore: 'question/delete'
		}),
		deleteQuestion() {
			this.deleteFromStore(this.question);
		}
	}
});
</script>
