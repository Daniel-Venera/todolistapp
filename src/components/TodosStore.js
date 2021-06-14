import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	todos: [{
		name: 'preums',
		completed: true
	}]
}
export default new Vuex.Store({
	state: state,
	mutations: {},
	getters: {},
	actions: {},
})	