export default {
	methods: {
		async loadingData(target, callback) {
			const loading = this.$loading({
				lock: true,
				text: '处理中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.5)',
				target: target ? target : document.body
			});
			try {
				await callback();
			} finally {
				loading.close();
			}
		},
		confirm(msg, doConfirm, doCancel, options) {
			if (!options) {
				options = {
					title: '提示',
					type: 'warning'
				};
			}
			this.$confirm(msg, options.title, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: options.type
			})
				.then(async () => {
					try {
						if (doConfirm) {
							await doConfirm();
						}
					} catch (err) {
						console.log(err);
					}
				})
				.catch(async () => {
					try {
						if (doCancel) {
							await doCancel();
						}
					} catch (err) {
						console.log(err);
					}
				});
		},

		alert(msg, title = '提示', doCancel) {
			this.$alert(msg, title, {
				showConfirmButton: false,
				callback: async (action) => {
					if (action == 'cancel') {
						if (doCancel) {
							await doCancel();
						}
					}
				}
			});
		}
	}
};
