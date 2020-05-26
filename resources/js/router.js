import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
Vue.use(VueRouter);

import Home from './components/HomeComponent.vue';
import Dashboard from './components/DashboardComponent.vue';
import Editor from './components/QuizEditorComponent.vue';
import Login from './components/LoginComponent.vue';

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/dashboard',
		component: Dashboard,
		beforeEnter: (to, from, next) => {
			console.log();
			if (!store.getters['auth/authenticated']){
				next({
					'path': '/login'
				});
			}
			next();
		}
	},
	{
		path: '/edit/:quiz',
		component: Editor
	},
	{
		path: '/login',
		component: Login
	}
]

const router = new VueRouter({
	routes
})

export default router;
