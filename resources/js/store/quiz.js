import axios from 'axios';

export default {
	namespaced: true,
	state: {
		ownQuizzes: [],
		othersQuizzes: [],
	},
	getters: {
		ownQuizzes(state) {
			return state.ownQuizzes;
		},
		othersQuizzes(state){
			return state.othersQuizzes;
		}
	},
	mutations: {
		SET_OWN_QUIZZES(state, ownQuizzes) {
			state.ownQuizzes = ownQuizzes;
		},
		SET_OTHERS_QUIZZES(state, othersQuizzes) {
			state.othersQuizzes = othersQuizzes;
		},
		APPEND_OWN_QUIZZ(state, newQuiz) {
			console.log(state.ownQuizzes);
			state.ownQuizzes.push(newQuiz);
			console.log(state.ownQuizzes);
		},
		UPDATE_QUIZ(state, updatedQuiz) {
			const myQuizzes = state.ownQuizzes;

			const toRemove = myQuizzes.findIndex((quiz) =>
				quiz.id === updatedQuiz.id
			);
			myQuizzes.splice(toRemove, 1, updatedQuiz);

			state.ownQuizzes = [ ...myQuizzes ];
		},
	},
	actions: {
		get({ commit }, credentials) {
			console.log('getting the quizzes');
			axios.get('quiz/mine').then(({data}) => 
				commit('SET_OWN_QUIZZES', data)
			);
			axios.get('quiz/others').then(({data}) => 
				commit('SET_OTHERS_QUIZZES', data)
			);
		},
		create({ commit}, quizInfo) {
			try {
				axios.post('quiz', quizInfo).then(({data}) =>
					commit('APPEND_OWN_QUIZZ', data)
				);
			} catch (e) {
				console.warn(e);
			}
		},
		async rename({ commit}, {id, quiz_name}) {
			console.log(id, quiz_name);
			try {
				const {data} = await axios.patch(`quiz/${id}`, { quiz_name });
				console.log(data);
				commit('UPDATE_QUIZ', data);
			} catch (e) {
				console.warn(e);
			}
		},
		async deleteQuiz({commit, getters}, quizId) {
			console.log('Delete quiz: ', quizId);
			try {
				const {data} = await axios.delete(`quiz/${quizId}`);
				const quizzes = getters.ownQuizzes;
				const index = quizzes.findIndex((quiz) =>
					quiz.id === quizId
				);

				quizzes.splice(index, 1);
				commit('SET_OWN_QUIZZES', quizzes);
				return {
					status: 'success'
				};
			} catch (e) {
				if (e?.response?.status === 409) {
					const { error, rounds, questions } = e.response.data;
					console.warn(error);
					return {
						status: 'error',
						data: e.response.data
					};
				} else console.warn(e);
			}
		}
	}
};
