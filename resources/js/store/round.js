import axios from 'axios';

export default {
	namespaced: true,
	state: {
		rounds: {},
	},
	getters: {
		rounds(state) {
			return state.rounds;
		},
	},
	mutations: {
		SET_ROUNDS(state, {quizId, rounds}) {
			const startingRounds = state.rounds;
			startingRounds[quizId] = rounds;
			const newRounds = { ...startingRounds };
			state.rounds = newRounds;
		},
	},
	actions: {
		async get({ commit }, quizId) {
			try {
				const url = `round/fromQuiz/${quizId}`;
				const {data} = await axios.get(url);
				if (!data) {
					return;
				}
				commit('SET_ROUNDS', {
					quizId,
					rounds: data
				});
			} catch (e) {
				console.warn(e);
			}
		},
		create({ getters, commit}, roundInfo) {
			try {
				axios.post('round', roundInfo).then(({data}) => {
					const roundList = getters.rounds[parseInt(data.quiz)];
					roundList.push(data);
					commit('SET_ROUNDS', roundList)
				});
			} catch (e) {
				console.warn(e);
			}
		}
	}
};
