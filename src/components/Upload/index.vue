<template>
	<div class="upload-container">
		<el-dialog
			v-el-drag-dialog
			class="common-dialog"
			title="请选择上传文件"
			:visible="visible"
			width="30%"
			@close="handleCloseDialog"
		>
			<div class="dialog-body">
				<div class="upload-block">
					<i class="el-icon-upload" style="font-size: 34px; margin-top: 12px;"></i>
					<p style="color: #7e3689;">请选择上传文件</p>
					<form enctype="multipart/form-data" class="formupload">
						<input
							id="file"
							ref="imgUpload"
							type="file"
							class="form-control upload"
							:accept="accept"
							@change="onFileChange($event)"
						/>
					</form>
				</div>
				<div class="upload-tips">
					<p>温馨提示：</p>
					<p>上传文件目前支持格式（大小）：{{ accept }}（{{ limitSize }}M）</p>
					<p>超过文件大小限制的，建议分成多个xlsx或CSV文件上传。</p>
				</div>
			</div>
		</el-dialog>
		<!-- 上传中loading start -->
		<div v-if="progressShow" class="upload-progress-mask">
			<div class="progress">
				<div class="animate">
					<img src="@/assets/pageBg/u1162.png" alt="" />
				</div>
				<div class="percent">{{ progress }}</div>
				<p>{{ filename }}</p>
				<p>正在上传，请耐心等待......</p>
			</div>
		</div>
		<!-- 上传中loading end -->
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Upload',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		uploadURL: {
			type: String,
			default: ''
		},
		accept: {
			type: String,
			default: '.xlsx'
		},
		// 上传数据类型
		target: {
			type: String,
			default: ''
		},
		limitSize: {
			type: Number,
			default: 200
		}
	},
	data() {
		return {
			dialogVisible: this.visible,
			//上传进度条
			progress: '',
			progressShow: false,
			filename: ''
		};
	},
	methods: {
		handleCloseDialog() {
			this.$emit('update:visible', false);
		},
		onFileChange(e) {
			let formData = new FormData();
			let file = e.target.files[0];
			let fileNameArr = file.name.split('.');
			let ext = fileNameArr[fileNameArr.length - 1];
			let extLowerCase = ext.toLowerCase();
			if (extLowerCase == 'xlsx' || extLowerCase == 'csv') {
				if (file.size / 1024 / 1024 > this.limitSize) {
					this.$message.error('文件大小不能超过' + this.limitSize + 'M！');
					e.target.value = '';
					return;
				}
			} else {
				this.$message.error('文件格式不正确！');
				e.target.value = '';
				return;
			}
			this.$emit('update:visible', false);
			this.progress = '0%';
			// this.progressShow = true;
			const loading = this.$loading({
				lock: true,
				text: '正在上传导入，请耐心等待...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			// setTimeout(() => {
			//   loading.close();
			// }, 2000);
			formData.append('file', file);
			formData.append('target', this.target);
			this.filename = file.name;
			const that = this;
			axios({
				method: 'POST',
				url: this.uploadURL,
				timeout: 1800000,
				data: formData
			})
				.then(function (res) {
					loading.close();
					console.log(res);
					if (res.success) {
						that.$message.success('上传成功！');
						that.$emit('loadDataList', that.filename);
						e.target.value = '';
					} else {
						that.$message.error(res.message);
						e.target.value = '';
					}
				})
				.catch(function (error) {
					loading.close();
					that.$message.error('上传文件失败！');
					console.log(error);
					e.target.value = '';
				});
		}
	}
};
</script>

<style scoped lang="scss">
.upload-container {
	.dialog-body {
		.upload-block {
			border: 1px dashed #ccc;
			width: 266px;
			height: 92px;
			margin: 0 auto 16px;
			border-radius: 4px;
			text-align: center;
			position: relative;
		}

		.upload-block form {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}

		.upload-block form #file {
			width: 100%;
			height: 100%;
		}

		.upload-tips {
			text-align: center;
		}
	}

	/*上传进度条*/

	.upload-progress-mask {
		min-width: 1340px;
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.298039215686275);
		position: absolute;
		left: -20px;
		top: 0;
		z-index: 999;
		.progress {
			width: 438px;
			height: 279px;
			z-index: 9999;
			background-color: #fff;
			border-radius: 6px;
			margin: 200px auto 0 auto;
			padding-top: 20px;
			position: relative;
			p {
				margin-top: 30px;
				text-align: center;
			}
		}

		.animate {
			width: 110px;
			height: 110px;
			margin: 40px auto 0 auto;
			position: relative;
			-webkit-transition-property: -webkit-transform;
			-webkit-transition-duration: 1s;
			-moz-transition-property: -moz-transform;
			-moz-transition-duration: 1s;
			-webkit-animation: rotate 3s linear infinite;
			-moz-animation: rotate 3s linear infinite;
			-o-animation: rotate 3s linear infinite;
			animation: rotate 3s linear infinite;
		}
	}

	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-moz-keyframes rotate {
		from {
			-moz-transform: rotate(0deg);
		}
		to {
			-moz-transform: rotate(359deg);
		}
	}
	@-o-keyframes rotate {
		from {
			-o-transform: rotate(0deg);
		}
		to {
			-o-transform: rotate(359deg);
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}

	.upload-progress-mask .animate img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.upload-progress-mask .percent {
		position: absolute;
		left: 46%;
		top: 36%;
	}
}
</style>
