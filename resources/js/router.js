import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
Vue.use(VueRouter);

import Home from './components/HomeComponent.vue';
import Dashboard from './components/DashboardComponent.vue';
import Editor from './components/QuizEditorComponent.vue';
import Play from './components/PlayQuizComponent.vue';
import Login from './components/LoginComponent.vue';

const authMiddleware = (to, from, next) => {
	if (!store.getters['auth/authenticated']){
		next({
		'path': '/login'
		});
	}
	next();
}

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/dashboard',
		component: Dashboard,
		beforeEnter: authMiddleware,
	},
	{
		path: '/edit/:quiz',
		component: Editor,
		beforeEnter: authMiddleware,
	},
	{
		path: '/play/:quiz',
		component: Play,
		beforeEnter: authMiddleware,
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
