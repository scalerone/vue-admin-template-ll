export default {
	methods: {
		generateOptions(data) {
			let obj = data;
			let arr = [];
			for (let key in obj) {
				let temp = {
					label: obj[key],
					value: key
				};
				arr.push(temp);
			}
			return arr;
		}
	}
};
