import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import quiz from './quiz';

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
		quiz
	}
});
