<template>
	<div class="date-range-container">
		<el-dialog
			v-el-drag-dialog
			width="450px"
			center
			:visible.sync="visible"
			:before-close="handleClose"
			top="30vh"
			:modal="false"
			:close-on-click-modal="isCloseOnModal"
			:close-on-press-escape="isCloseOnEsc"
		>
			<div class="date-main-box">
				<span style="margin-right: 12px;">{{ desc }}</span>
				<el-date-picker
					v-model="dateRange"
					class="checkout-date-input"
					:type="type"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:value-format="valueFormat"
					:format="format"
					:editable="true"
					clearable
				>
				</el-date-picker>
			</div>
			<div style="text-align: center; margin-top: 20px; padding-bottom: 25px;">
				<el-button class="cancel-btn" plain style="width: 100px;" @click="handleClose"
					>取消</el-button
				>
				<el-button
					class="confirm-btn"
					type="primary"
					style="width: 100px;"
					:loading="loading"
					@click="handleConfirmClick"
					>确定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import UI from '@/mixins/ui';

export default {
	name: 'DateRange',
	mixins: [UI],

	props: {
		desc: {
			type: String,
			default: '请选择日期区间'
		},

		alertTip: {
			type: String
		},

		visible: {
			type: Boolean,
			default: false
		},

		valueFormat: {
			type: String,
			default: 'yyyy-MM-dd'
		},

		format: {
			type: String,
			default: 'yyyy/M/d'
		},

		type: {
			type: String,
			default: 'daterange'
		},

		isCloseOnModal: {
			type: Boolean,
			default: false
		},

		isCloseOnEsc: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			dateRange: [],
			loading: false
		};
	},

	mounted() {},

	methods: {
		handleClose() {
			this.$emit('update:visible', false);
			this.dateRange = [];
		},

		handleConfirmClick() {
			console.log('确认点击');
			if (!this.dateRange || this.dateRange.length === 0) {
				this.$message.warning(this.alertTip || this.desc);
				return;
			}
			this.loading = true;
			this.$emit('trigger', this.dateRange[0], this.dateRange[1], (loading) => {
				this.loading = loading;
				this.dateRange = [];
			});
		},

		handleDateChange(val) {
			console.log('change', val);
			if (this.type === 'monthrange') {
				if (val && val[1]) {
					let month = new Date(val[1]);
					let newMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
					let y = newMonth.getFullYear();
					let m = newMonth.getMonth() + 1;
					m = m < 10 ? '0' + m : m;
					val[1] = y + '-' + m + '-' + newMonth.getDate();
				}
			}
			console.log('after change', val);
		}
	}
};
</script>

<style lang="scss" scoped>
.date-range-container {
	.date-main-box {
		text-align: center;
	}

	.cancel-btn {
		height: 36px;
		line-height: 0.9;
		margin-right: 32px;
	}

	.confirm-btn {
		height: 36px;
		line-height: 0.9;
	}
}
</style>

<style lang="scss">
.date-range-container {
	.el-dialog__body {
		padding-bottom: 0;
	}

	.date-main-box {
		.checkout-date-input.el-input__inner {
			width: 210px;
			height: 28px;
		}

		.el-date-editor .el-range-input {
			font-size: 12px;
		}

		.el-date-editor--daterange.el-input,
		.el-date-editor--daterange.el-input__inner,
		.el-date-editor--timerange.el-input,
		.el-date-editor--timerange.el-input__inner {
			width: 210px;
		}
		.el-date-editor .el-range__icon {
			font-size: 12px;
			line-height: 29px;
		}

		.el-date-editor .el-range__close-icon {
			line-height: 22px;
		}

		.el-date-editor .el-range-separator {
			font-size: 13px;
			line-height: 29px;
		}
	}
}
</style>
