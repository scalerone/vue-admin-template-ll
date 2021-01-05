import { Message } from 'element-ui';

// 封装 element-ui Message，防止重复弹出message弹框
function SingleMessage(options) {
	if (SingleMessage.instance) {
		SingleMessage.instance.close();
	}
	SingleMessage.instance = Message(options);
}
['error', 'success', 'info', 'warning'].forEach((type) => {
	SingleMessage[type] = (options) => {
		if (typeof options === 'string') {
			options = {
				message: options
			};
		}
		options.type = type;
		return SingleMessage(options);
	};
});

export default SingleMessage;
