import axios from 'axios';

export default {
	namespaced: true,
	state: {
		quiz: '7',
		round: '1',
		question: '1',
		playing: false,
		marking: false,
	},
	getters: {
		playstate(state) {
			console.log('returning the playstate');
			return state;
		},
	},
	mutations: {
		SET_PLAYSTATE(state, { playstate}) {
			state = playstate;
		},
	},
	actions: {
		incrementQuestion ({ getters, commit }) {
			const { playstate } = getters;
			// TODO remove this once I've pointed out the numbers to laravel
			playstate.question = String(parseInt(playstate.question) + 1);

			commit('SET_PLAYSTATE', playstate);
		},
		incrementRound ({ getters, commit }) {
			const { playstate } = getters;
			// TODO remove this once I've pointed out the numbers to laravel
			playstate.round = String(parseInt(playstate.round) + 1);
			playstate.question = '0';

			commit('SET_PLAYSTATE', playstate);
		}
	}
};
