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
		}
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
		}
	}
};
