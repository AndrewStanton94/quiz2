import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './components/HomeComponent.vue';
import Dashboard from './components/DashboardComponent.vue';
import Login from './components/LoginComponent.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/login', component: Login }
]

const router = new VueRouter({
	routes
})

export default router;
