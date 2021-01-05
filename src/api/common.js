import http from './index';
import { Message } from 'element-ui';
export default {
	// 获取进度信息
	async getProgressState(id) {
		try {
			let res = await http.get(`api/progress/${id}/state`);
			if (res.success) {
				return res.data;
			} else {
				Message.error(res.message);
				return null;
			}
		} catch (err) {
			console.log(err);
		}
	}
};
