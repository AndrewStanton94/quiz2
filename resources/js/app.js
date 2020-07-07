/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import axios from 'axios';
import Vue from 'vue';
import router from './router.js';
import store from './store';
import subscriber from './store/subscriber'

import App from './components/App.vue';

axios.defaults.baseURL = 'https://apps.andrewstanton.tech/quiz2/public/api/';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map((key) => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('nav-component', require('./components/Nav.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// From: https://stackoverflow.com/a/54731059
Vue.use((Vue) => {
	// Assign a unique id to each component
	let uuid = 0;
	Vue.mixin({
		beforeCreate: function() {
			this.uuid = uuid.toString();
			uuid += 1;
		},
	});

	// Generate a component-scoped id
	Vue.prototype.$id = function(id) {
		return "uid-" + this.uuid + "-" + id;
	};
});

store.dispatch(
	'auth/attempt',
	localStorage.getItem('token')
).then(() => {
	new Vue({
		render: (createElement) => createElement(App),
		router,
		store
	}).$mount('#app');
});

