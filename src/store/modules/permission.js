import { asyncRoutes, currencyRoutes } from '@/router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role));
	} else {
		return true;
	}
}

const state = {
	routes: [], // 完整路由表
	addRoutes: [] //用户可访问路由表
};
const mutations = {
	SET_ROUTES(state, payload) {
		state.routes = [...currencyRoutes, ...payload];
		state.addRoutes = payload;
	}
};
// 遍历asyncRoutes动态路由
function forSearchArr(route, roles) {
	let arrNew = [];
	for (let item of route) {
		let itemNew = { ...item }; //解决浅拷贝共享同一内存地址
		console.log('forSearchArr', itemNew);
		if (hasPermission(roles, itemNew)) {
			if (itemNew.children) {
				itemNew.children = forSearchArr(itemNew.children, roles);
			}
			arrNew.push(itemNew);
		}
	}
	console.log('arrNew', arrNew);
	return arrNew;
}
const actions = {
	getAsyncRoutes({ commit, rootGetters }, roles) {
		return new Promise((resolve) => {
			let routes = [];
			if (rootGetters.userName === 'admin') {
				routes = asyncRoutes || '';
			} else {
				routes = forSearchArr(asyncRoutes, roles);
			}
			commit('SET_ROUTES', routes);
			resolve(routes);
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
