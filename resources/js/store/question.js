import axios from 'axios';

export default {
	namespaced: true,
	state: {
		questions: {},
	},
	getters: {
		questions(state) {
			console.log('returning the questions');
			return state.questions;
		},
	},
	mutations: {
		SET_QUESTIONS(state, {quizId, questions}) {
			const startingQuestions = state.questions;
			startingQuestions[quizId] = questions;
			const newQuestions = { ...startingQuestions };
			state.questions = newQuestions;
		},
	},
	actions: {
		async get({ commit }, quizId) {
			console.log('getting the questions');
			try {
				const url = `question/fromQuiz/${quizId}`;
				const {data} = await axios.get(url);
				if (!data) {
					return;
				}
				commit('SET_QUESTIONS', {
					quizId,
					questions: data
				});
			} catch (e) {
				console.warn(e);
			}
		},
		create({ getters, commit}, questionInfo) {
			console.log(questionInfo);
			try {
				axios.post('question', questionInfo).then(({data}) => {
					const questionList = getters.questions[data.quiz];
					questionList.push(data);
					commit('SET_QUESTIONS', questionList)
				});
			} catch (e) {
				console.warn(e);
			}
		},
		async delete({commit, getters}, {id}) {
			try {
				const {data} = await axios.delete(`question/${id}`);
				const questions = getters.questions[data.quiz];
				const indexToDelete = questions.findIndex((question) =>
					question.id === data.id
				);
				questions.splice(indexToDelete, 1);
				commit('SET_QUESTIONS', {
					quizId: id,
					questions
				});
			}
			catch (e) {
				console.log(e);
			}
		}
	}
};
