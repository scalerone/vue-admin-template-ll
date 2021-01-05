import loginApi from '@/api/login';
import { Message } from 'element-ui';
import router, { resetRouter } from '@/router';

const state = {
	token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
	userName: '',
	roles: [],
	authCodes: [],
	introduce: '',
	hospitalSelected: Number(sessionStorage.getItem('hospitalSelected'))
		? Number(sessionStorage.getItem('hospitalSelected'))
		: null
};
const mutations = {
	SET_TOKEN(state, val) {
		state.token = val;
		localStorage.setItem('token', val);
	},
	DEL_TOKEN(state) {
		state.token = '';
		state.userName = '';
		state.roles = [];
		state.authCodes = [];
		state.hospitalSelected = null;
		localStorage.removeItem('token');
	},
	SET_ROLES(state, payload) {
		state.roles = payload;
	},
	SET_NAME(state, payload) {
		state.userName = payload;
	},
	SET_AUTHCODES(state, payload) {
		state.authCodes = payload;
	}
};
const actions = {
	// user login
	async _login({ commit }, formdatas) {
		// let token = await loginApi.login(formdatas);
		if (formdatas.username !== 'admin' || formdatas.password !== 'admin888') {
			Message.error('账号或密码错误');
			return false;
		}
		if (formdatas.password !== 'admin888') {
			Message.error('账号或密码错误');
			return false;
		}

		let token = 'JKSDFDSFJSDFJWS445';
		if (token) {
			Message.success('登录成功');
			commit('SET_TOKEN', token);
			return true;
		} else {
			return false;
		}
	},
	async loginOut({ commit }) {
		await loginApi.logout();
		commit('DEL_TOKEN');
		resetRouter();
		router.push({
			path: '/login',
			query: {
				redirect: '/'
			}
		});
	},
	async _getInfo({ commit }) {
		// let res = await loginApi.getUserInfo();
		console.log('_getInfo');
		let res = { username: 'admin', role: 'admin', authCodes: ['0101'] };
		console.log(res);
		if (res) {
			const { username, role, authCodes } = res;
			commit('SET_ROLES', [role]);
			commit('SET_NAME', username);
			commit('SET_AUTHCODES', authCodes);
		}
		return res;
	},
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('DEL_TOKEN');
			resolve();
		});
	}
};
export default {
	namespaced: true,
	state,
	mutations,
	actions
};
