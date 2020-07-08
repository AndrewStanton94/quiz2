import axios from 'axios';

const startingState = {
	quiz: null,
	round: null,
	question: null,
	playing: false,
	marking: false,
	resumeAt: {},
};

export default {
	namespaced: true,
	state: {
		...startingState
	},
	getters: {
		playstate(state) {
			return state;
		},
	},
	mutations: {
		SET_PLAYSTATE(state, {quiz, round, question, playing, marking, resumeAt}) {
			state.quiz = quiz;
			state.round = round;
			state.question = question;
			state.playing = playing;
			state.marking = marking;
			state.resumeAt = resumeAt;
		},
	},
	actions: {
		startGame ({ commit }, quiz) {
			const playstate = {
				quiz: quiz,
				question: 1,
				round: 1,
				playing: true,
				marking: false,
			};
			commit('SET_PLAYSTATE', playstate);
		},
		incrementQuestion ({ getters, commit }) {
			const { playstate } = getters;
			playstate.question = playstate.question + 1;

			commit('SET_PLAYSTATE', playstate);
		},
		incrementRound ({ getters, commit }) {
			const { playstate } = getters;
			playstate.round = playstate.round + 1;
			playstate.question = 1;

			commit('SET_PLAYSTATE', playstate);
		},
		markRound ({ getters, commit }, { backTo, resumeAt }) {
			const { playstate } = getters;
			playstate.playing = false;
			playstate.marking = true;
			playstate.resumeAt = resumeAt;
			playstate.round = backTo.round;
			playstate.question = backTo.question;
			commit('SET_PLAYSTATE', playstate);
		},
		resumePlay ({ getters, commit }) {
			const { playstate } = getters;
			const { round, question } = playstate.resumeAt;
			playstate.playing = true;
			playstate.marking = false;

			playstate.round = round;
			playstate.question = question;
			playstate.resumeAt = {};

			commit('SET_PLAYSTATE', playstate);
		},
		logout({commit}) {
			commit('SET_PLAYSTATE', startingState);
		}
	}
};
