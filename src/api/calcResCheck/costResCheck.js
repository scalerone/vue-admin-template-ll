import http from '../index';
import SingleMessage from '@/utils/SingleMessage';

export default {
	// 成本计算检查列表
	async get(searchCondition = {}, pageIndex = 1, pageSize = 10) {
		try {
			let postData = {
				pageIndex,
				pageSize,
				...searchCondition
			};
			let res = await http.post('/compute/verify/page', postData);
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
	//新建结果检查
	async create(postData) {
		try {
			let res = await http.post('/compute/verify', postData);
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
	//获取子项列表数据
	async getDetailList(searchCondition = {}, pageIndex = 1, pageSize = 10) {
		try {
			let postData = {
				pageIndex,
				pageSize,
				...searchCondition
			};
			let res = await http.post('/compute/verify/item/page', postData);
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
