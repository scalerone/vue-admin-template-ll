import http from './index';
import SingleMessage from '@/utils/SingleMessage';

export default {
	async getFilePage(params = {}) {
		try {
			let res = await http.post('/importer/file/page', params);
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
