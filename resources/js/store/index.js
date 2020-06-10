import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import quiz from './quiz';
import round from './round';
import question from './question';
import answer from './answer';
import playState from './playState';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	},

	mutations: {
	},

	actions: {
	},

	modules: {
		auth,
		quiz,
		round,
		question,
		answer,
		playState
	}
});
