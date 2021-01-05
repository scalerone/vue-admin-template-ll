/*
set sidebar open or close,and some app setting
 */
const state = {
	opened: sessionStorage.getItem('open') ? sessionStorage.getItem('open') : 'false',
	msgIsShow: false,
	showDriver: localStorage.getItem('driver') ? localStorage.getItem('driver') : 'yes',
	dynamicWidth: JSON.parse(sessionStorage.getItem('open')) ? '64px' : '200px'
};
const mutations = {
	SET_OPENED(state, payload) {
		state.opened = String(payload);
		sessionStorage.setItem('open', payload);
		if (!payload) {
			state.dynamicWidth = '200px';
		} else {
			state.dynamicWidth = '64px';
		}
	},
	SET_MSGISOPEN(state) {
		state.msgIsShow = !state.msgIsShow;
	},
	SET_DRIVER(state, payload) {
		state.showDriver = payload;
		localStorage.setItem('driver', payload);
	}
};
export default {
	namespaced: true,
	state,
	mutations
};
