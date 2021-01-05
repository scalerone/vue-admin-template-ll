import http from './index';
import SingleMessage from '@/utils/SingleMessage';

export default {
	async login(params = {}) {
		try {
			let res = await http.post('/token', params);
			if (res.success) {
				return res.data;
			} else {
				SingleMessage.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	},

	async getUserInfo() {
		try {
			let res = await http.get('/self/info');
			if (res.success) {
				return res.data;
			} else {
				SingleMessage.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	},
	async logout() {
		try {
			let res = await http.delete('/api/token');
			if (res.success) {
				return res.data;
			} else {
				SingleMessage.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	},
	//获取医院列表
	async getHospitalList() {
		try {
			let res = await http.get('/api/hospital/all');
			if (res.success) {
				return res.data;
			} else {
				SingleMessage.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	},
	//切换当前医院
	async changeCurrentHospital(id) {
		try {
			let res = await http.put('/api/user/current-hospital?id=' + id);
			if (res.success) {
				return res.data;
			} else {
				SingleMessage.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	}
};
