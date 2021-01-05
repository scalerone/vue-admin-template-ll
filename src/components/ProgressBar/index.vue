<template>
	<div class="progress-bar-container">
		<el-dialog
			width="450px"
			center
			:visible.sync="visible"
			:before-close="handleClose"
			top="30vh"
			:modal="false"
			:close-on-click-modal="isCloseOnModal"
			:close-on-press-escape="isCloseOnEsc"
		>
			<div class="progress-main-box">
				<p>{{ desc }}</p>
				<el-progress
					color="#7e3688"
					:class="{ hideText: !isTextInside }"
					:text-inside="isTextInside"
					:stroke-width="25"
					:percentage="percentage"
				>
				</el-progress>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'ProgressBar',
	props: {
		// 是否开启百分比文字显示
		isTextInside: {
			type: Boolean,
			default: true
		},
		desc: {
			type: String,
			default: '正在处理中'
		},
		visible: {
			type: Boolean,
			default: false
		},
		isCloseOnModal: {
			type: Boolean,
			default: false
		},
		isCloseOnEsc: {
			type: Boolean,
			default: false
		},
		percentage: {
			type: Number,
			default: 0
		}
	},

	data() {
		return {};
	},

	mounted() {},

	methods: {
		handleClose() {
			this.$emit('update:visible', false);
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
.progress-bar-container {
	/* 无百分比模式样式 */
	.hideText {
		::v-deep .el-progress-bar {
			padding-right: 0;
		}
		::v-deep .el-progress__text {
			display: none;
		}
	}
	p {
		text-align: center;
		line-height: 30px;
		font-size: 16px;
		font-weight: 700;
		color: #7e3688;
	}

	p + p {
		margin-bottom: 30px;
	}
}
</style>

<style lang="scss">
.progress-bar-container {
	.el-dialog__body {
		padding-bottom: 60px;
	}
}
</style>
