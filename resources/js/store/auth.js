import axios from 'axios';

export default {
	namespaced: true,
	state: {
		token: null,
		user: null,
	},
	getters: {
		authenticated(state) {
			return state.token && state.user;
		},
		user(state){
			return state.user;
		}
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
		},
		SET_USER(state, data) {
			state.user = data;
		}
	},
	actions: {
		async signIn({ dispatch }, credentials) {
			let response = await axios.post('auth/signin', credentials);
			return dispatch('attempt', response.data.token);
		},

		async attempt({commit, dispatch}, token) {
			if(!token) {
				dispatch('quiz/getAnon', {}, {root:true});
				return;
			}
			commit('SET_TOKEN', token);
			try {
				let response = await axios.get('auth/me');
				commit('SET_USER', response.data);
				dispatch('quiz/get', {}, {root:true});
			} catch (e) {
				commit('SET_TOKEN', null);
				commit('SET_USER', null);
			}
		},

		signOut({ commit, dispatch }) {
			return axios.post('auth/signout').then(() => {
				commit('SET_TOKEN', null);
				commit('SET_USER', null);
				dispatch('quiz/getAnon', {}, {root:true});
				dispatch('round/logout', {}, {root:true});
				dispatch('question/logout', {}, {root:true});
				dispatch('answer/logout', {}, {root:true});
				dispatch('playState/logout', {}, {root:true});
			});
		}
	}
};
