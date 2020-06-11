import axios from 'axios';

export default {
	namespaced: true,
	state: {
		quiz: null,
		round: null,
		question: null,
		playing: false,
		marking: false,
	},
	getters: {
		playstate(state) {
			return state;
		},
	},
	mutations: {
		SET_PLAYSTATE(state, {quiz, round, question, playing, marking}) {
			state.quiz = quiz;
			state.round = round;
			state.question = question;
			state.playing = playing;
			state.marking = marking;
		},
	},
	actions: {
		startGame ({ commit }, quiz) {
			const playstate = {
				quiz: String(quiz),
				question: '1',
				round: '1',
				playing: true,
				marking: false,
			};
			commit('SET_PLAYSTATE', playstate);
		},
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
			playstate.question = '1';

			commit('SET_PLAYSTATE', playstate);
		}
	}
};
