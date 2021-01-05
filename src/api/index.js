import axios from 'axios';
import Qs from 'qs';
import store from '@/store';
import router from '@/router';
import SingleMessage from '@/utils/SingleMessage';

// axios 配置
axios.defaults.timeout = 50000;
// 通过.env区分的环境变量
// let baseURL = process.env.VUE_APP_BASE_API;
let baseURL = 'api/xx/';

axios.defaults.baseURL = baseURL;

// 在全局请求和响应拦截器中添加请求状态

// 请求拦截器
axios.interceptors.request.use(
	(config) => {
		if (config.formType) {
			config.headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};
		} else {
			config.headers = {
				'Content-Type': 'application/json'
			};
		}
		const token = store.getters.token;
		if (token) {
			config.headers.token = token; // 请求头部添加token
		}
		//只针对get方式进行序列化-传递数组参数
		if (config.method === 'get') {
			config.paramsSerializer = function (params) {
				return Qs.stringify(params, { arrayFormat: 'repeat' });
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		const code = response.status;
		if ((code >= 200 && code < 300) || code === 304) {
			let errCode = response.data.errCode;
			if (errCode === 'SYS0401') {
				store.commit('user/DEL_TOKEN');
				router.replace({
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				});
			}

			if (errCode === '0101') {
				//请选择医院

				SingleMessage.error(response.data.message); //切换菜单的时候提示没了
			}

			return Promise.resolve(response.data);
		} else {
			return Promise.reject(response);
		}
	},
	(error) => {
		console.log('http response error.response');
		console.log(error);
		if (error.response) {
			switch (error.response.status) {
				case 401:
					// 返回401 清除token信息并跳转到登陆页面
					store.commit('user/DEL_TOKEN');
					router.replace({
						path: '/login',
						query: {
							redirect: router.currentRoute.fullPath
						}
					});
					break;
				case 403:
					if (!sessionStorage.isLostPermission) {
						sessionStorage.isLostPermission = true;
						SingleMessage.error('角色权限发生变更，请重新登录');
						store.commit('user/DEL_TOKEN');
						router.replace({
							path: '/login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						});
						return;
					}
					break;
				case 404:
					SingleMessage.error('网络请求不存在');
					router.push({
						name: router.currentRoute.path === '/login' ? 'outerError' : 'innerError',
						params: {
							path: router.currentRoute.path,
							desc: '您请求的资源找不到(错误码：404) '
						}
					});
					break;
				case 500:
					router.push({
						name: router.currentRoute.path === '/login' ? 'outerError' : 'innerError',
						params: {
							path: router.currentRoute.path,
							desc: '服务器错误(错误码：500)，请联系系统管理员 '
						}
					});
					SingleMessage.error('服务器错误(错误码：500)，请联系系统管理员');
					break;
				case 502:
					console.log(502);
					router.push({
						name: router.currentRoute.path === '/login' ? 'outerError' : 'innerError',
						params: {
							path: router.currentRoute.path,
							desc: '网关错误(错误码：502)，请联系系统管理员 '
						}
					});
					SingleMessage.error('网关错误(错误码：502)，请联系系统管理员 ');
					break;
				default:
					SingleMessage.error(error.response.data.message);
			}
		} else {
			// 请求超时或者网络有问题
			if (error.message.includes('timeout')) {
				SingleMessage.error('请求超时！请检查网络是否正常');
			} else {
				SingleMessage.error('请求失败，请检查网络是否已连接');
			}
			return;
		}
		return Promise.reject(error);
	}
);

export default axios;
export function post(url, data) {
	return axios({
		method: 'post',
		url,
		data: Qs.stringify(data),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	});
}

export function get(url, params) {
	return axios({
		method: 'get',
		url,
		params
	});
}
