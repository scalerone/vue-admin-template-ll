import tableStyle from '@/mixins/tableStyle';
import dataProcess from '@/mixins/dataProcess';
import ui from '@/mixins/ui';
import dateTimeUtil from '@/utils/dateTimeUtil';
import { tofixed } from '@/utils/util';
import { ZeroPositiveNumReg, PositiveNumReg, IntegerReg } from '@/utils/regular';

export default {
	mixins: [tableStyle, dataProcess, ui],
	data() {
		return {
			// 请求接口对象
			api: undefined,
			// 包裹块名称
			wrapperClass: '',
			// 查询条件
			searchCondition: {},
			loading: false,
			tableHeight: 0,
			pageIndex: 1,
			pageSize: 10,
			totalRowCount: 0,
			minDate: '',
			maxDate: '',
			tableData: [],
			multipleSelection: [],
			// 模态框显示隐藏
			visible: false,
			addOrEdit: 'add'
		};
	},
	computed: {
		dialogTitle() {
			return this.addOrEdit === 'add' ? '添加' : '编辑';
		}
	},
	methods: {
		//格式化金额
		formatAmount(row, column, cellValue) {
			return tofixed(cellValue, 2);
		},
		formatTime(row, column, cellValue) {
			return dateTimeUtil.formatTimeString(cellValue, 'YYYY年MM月');
		},
		formatTime2(row, column, cellValue) {
			return dateTimeUtil.formatTimeString(cellValue, 'YYYY年MM月DD日HH:mm:ss');
		},

		checkNum(rule, value, callback) {
			if (value != '' && isNaN(value)) {
				callback(new Error('请输入数字值'));
			} else {
				callback();
			}
		},
		checkNumInteger(rule, value, callback) {
			if (!IntegerReg.test(value)) {
				callback(new Error('请输入数字值'));
			} else {
				callback();
			}
		},
		// 数值（包含正整数，0以及正浮点数）
		checkZeroPositiveNum(rule, value, callback) {
			if (!ZeroPositiveNumReg.test(value)) {
				callback(new Error('输入格式不正确'));
			} else {
				callback();
			}
		},
		// 数值（包含正整数，正浮点数）
		checkPositiveNum(rule, value, callback) {
			if (!PositiveNumReg.test(value)) {
				callback(new Error('输入格式不正确'));
			} else {
				callback();
			}
		},
		// 数值（包含正整数，正浮点数），允许为空
		checkNullPositiveNum(rule, value, callback) {
			if (!value) callback();
			if (!PositiveNumReg.test(value)) {
				callback(new Error('输入格式不正确'));
			} else {
				callback();
			}
		},

		// 清除排序条件
		cleartSort() {
			this.searchCondition.sort = [];
			this.$refs.table.clearSort();
		},
		// 清空表单/校验
		clearForm() {
			this.$refs['form'] && this.$refs['form'].resetFields();
		},
		// 清空校验
		clearValidate() {
			this.$refs['form'] && this.$refs['form'].clearValidate();
		},
		// 清空多选
		clearSelection() {
			this.$refs['table'] && this.$refs['table'].clearSelection();
		},
		// 自定义列排序
		handleCustomSort({ column, prop, order }) {
			this.searchCondition.sort = [];
			let obj = {
				column: prop,
				order: order === 'ascending' ? 'asc' : 'desc'
			};
			this.searchCondition.sort.push(obj);
			this.get();
		},
		// 查询
		handleSearchClick(event, callBack) {
			callBack && callBack();
			this.pageIndex = 1;
			this.cleartSort();
			this.get();
		},
		// 刷新
		handleResetClick(event, callBack) {
			callBack && callBack();
			this.pageIndex = 1;
			this.pageSize = 10;
			this.cleartSort();
			this.get();
		},
		// 添加
		handleAdd(event, preCallBack, afterCallBack) {
			preCallBack && preCallBack();
			// 清空表单/校验
			this.clearForm();
			this.addOrEdit = 'add';
			afterCallBack && afterCallBack();
			this.visible = true;
		},
		// 编辑
		handleEdit(event, callBack) {
			// 清空校验
			this.clearValidate();
			this.addOrEdit = 'edit';
			callBack && callBack();
			// 只允许单行编辑
			if (this.multipleSelection.length === 0) {
				return this.$message({
					message: '请先选择一行数据',
					type: 'warning'
				});
			} else if (this.multipleSelection.length > 1) {
				return this.$message({
					message: '只能对单行数据进行编辑',
					type: 'warning'
				});
			}
			this.visible = true;
			let [chooseData] = this.multipleSelection;
			this.$nextTick(() => {
				this.formData = {
					...chooseData
				};
			});
		},
		// 更多操作
		handleMoreOpt(command) {
			if (command === 'excel') {
				console.log('更多操作导出excel');
			} else if (command === 'csv') {
				console.log('更多操作导出CSV');
			} else if (command === 'del') {
				if (this.multipleSelection.length === 0) {
					return this.$message({
						message: '请先选择要删除的数据',
						type: 'warning'
					});
				}
				this.$confirm('您确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(async () => {
						let ids = this.multipleSelection.map((v) => v.id);
						let res = await this.api.del(ids);
						if (res) {
							this.$message.success('删除数据成功');
							this.get();
						}
					})
					.catch(() => {});
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleSizeChange(newSize) {
			this.pageIndex = 1;
			this.pageSize = newSize;
			this.get();
			// this.relayout(this, 'table', this.$refs.table.bodyWrapper);
		},
		handleCurrentChange(curNo) {
			this.pageIndex = curNo;
			this.get();
			// 有滚动条情况下，翻页后自动滚动到顶部
			this.$nextTick(() => {
				this.$refs.table.bodyWrapper.scrollTop = 0;
			});
		},
		// 确定提交表单
		async handleConfirm(event, callBack) {
			this.$refs.form.validate(async (valid) => {
				if (!valid) return;
				callBack && callBack();
				if (this.addOrEdit === 'add') {
					// 新建
					let res = await this.api.create(this.formData);
					if (res) {
						this.$message.success('新建数据成功');
						this.get();
						this.visible = false;
					}
					return;
				} else {
					// 编辑
					let res = await this.api.edit(this.formData);
					if (res) {
						this.$message.success('修改数据成功');
						this.get();
						this.visible = false;
					}
					return;
				}
			});
		},
		// 关闭模态框
		handleCancel() {
			// this.clearSelection();
			this.visible = false;
		},
		// 获取数据列表
		async get(callBack) {
			this.loadingData(this.wrapperClass, async () => {
				let res = await this.api.get(this.searchCondition, this.pageIndex, this.pageSize);
				if (res) {
					this.tableData = res.data;
					callBack && callBack();
					this.pageIndex = res.pageIndex;
					this.pageSize = res.pageSize;
					this.totalRowCount = res.totalRowCount;
				}
			});
		}
	},
	mounted() {
		this.refreshTable('table', 120, 'tableHeight', this)();
		window.addEventListener('resize', this.refreshTable('table', 120, 'tableHeight', this));
		// this.$refs.table.bodyWrapper.addEventListener(
		// 	'scroll',
		// 	this.relayout(this, 'table', this.$refs.table.bodyWrapper)
		// );
		this.get();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.refreshTable('table', 120, 'tableHeight', this));
		// this.$refs.table.bodyWrapper.removeEventListener(
		// 	'scroll',
		// 	this.relayout(this, 'table', this.$refs.table.bodyWrapper)
		// );
	}
};
