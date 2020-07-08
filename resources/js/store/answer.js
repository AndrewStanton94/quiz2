import axios from 'axios';

export default {
	namespaced: true,
	state: {
		answers: {},
	},
	getters: {
		answers(state) {
			console.log('returning the answers');
			return state.answers;
		},
	},
	mutations: {
		SET_ANSWERS(state, {quizId, answers}) {
			const startingAnswers = state.answers;
			startingAnswers[quizId] = answers;
			const newAnswers = { ...startingAnswers };
			state.answers = newAnswers;
		},
		EMPTY_ANSWERS(state) {
			state.answers = {};
		}
	},
	actions: {
		async get({ commit }, quizId) {
			console.log('getting the answers');
			try {
				const url = `answer/from/${quizId}`;
				const {data} = await axios.get(url);
				if (!data) {
					return;
				}
				commit('SET_ANSWERS', {
					quizId,
					answers: data
				});
			} catch (e) {
				console.warn(e);
			}
		},
		create({ getters, commit}, answerInfo) {
			console.log(answerInfo);
			axios.post('answer', answerInfo).then(({data}) => {
				// TODO: Validate the attributes
				console.log(data);
				const quizAnswers = getters.answers[data.quiz];
				quizAnswers.push(data);
				commit('SET_ANSWERS', quizAnswers)
			}).catch(( err ) => console.log(err));
		},
		update({ getters, commit}, answerInfo) {
			console.log(answerInfo);
			const {id, answer, score} = answerInfo;
			axios.patch(`answer/${id}`, {answer, score}).then(({data}) => {
				// TODO: Validate the attributes
				console.log(data);
				const quizAnswers = getters.answers[data.quiz];
				const indexToReplace = quizAnswers.findIndex(
					(ans) => ans.id === data.id
				);
				quizAnswers.splice(indexToReplace, 1, data);
				commit('SET_ANSWERS', quizAnswers)
			}).catch(( err ) => console.log(err));
		},
		logout({commit}){
			commit('EMPTY_ANSWERS');
		}
	}
};
