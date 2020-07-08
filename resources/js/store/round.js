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
		EMPTY_ROUNDS (state) {
			state.rounds = {};
		}
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
					const roundList = getters.rounds[data.quiz];
					roundList.push(data);
					commit('SET_ROUNDS', roundList)
				});
			} catch (e) {
				console.warn(e);
			}
		},
		async rename({ commit, getters }, {id, round_name}) {
			try {
				const {data} = await axios.patch(`round/${id}`, {
					round_name
				});

				const rounds = getters.rounds[data.quiz];
				const index = rounds.findIndex((round) =>
					round.id === id
				);

				rounds.splice(index, 1, data);
				commit('SET_ROUNDS', {
					quizId: data.quiz,
					rounds,
				});

			} catch (e) {
				console.warn(e);
			}
		},
		async deleteRound({commit, getters}, roundId) {
			console.log('Delete round: ', roundId);
			try {
				const {data} = await axios.delete(`round/${roundId}`);
				const rounds = getters.rounds[data.quiz];
				const index = rounds.findIndex((round) =>
					round.id === roundId
				);

				rounds.splice(index, 1);
				commit('SET_ROUNDS', {
					quizId: data.quiz,
					rounds,
				});
			} catch (e) {
				if (e?.response?.status === 409) {
					console.warn('Can\'t delete a round that still has questions');
				} else console.warn(e);
			}
		},
		logout({commit}) {
			commit('EMPTY_ROUNDS');
		}
	}
};
