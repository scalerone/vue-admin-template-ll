import http from '../index';
import SingleMessage from '@/utils/SingleMessage';

export default {
	// 医院成本科室数据列表
	async get(searchCondition = {}, pageIndex = 1, pageSize = 10) {
		try {
			let postData = {
				pageIndex,
				pageSize,
				...searchCondition
			};
			let res = await http.post('/cost/compute/history/page', postData);
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

	async getComputeState() {
		try {
			let res = await http.get('/cost/compute/state');
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

	async locked(id, locked) {
		try {
			let params = {
				id,
				locked
			};
			let res = await http.put('/cost/compute/history/locked', params);
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
	async compute(params) {
		try {
			let res = await http.post('/cost/compute/history/compute', params);
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
	//获取有计算的核算方案列表
	async getComputedPlanAll() {
		try {
			let res = await http.get('/cost/compute/plan/all');
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
	//获取计算时的区间范围
	async getComputedTimeRange() {
		try {
			let res = await http.get('/cost/compute/time/range');
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

	//获取分摊方案的计算周期列表
	async getComputedPlanPeriod(planId) {
		try {
			let params = {
				params: {
					planId
				}
			};
			let res = await http.get('/cost/compute/plan/period', params);
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
