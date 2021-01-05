<template>
	<div class="file-import">
		<div class="content">
			<div class="left-tree">
				<el-scrollbar>
					<el-tree
						ref="leftSideTree"
						node-key="id"
						:data="leftSideMenu"
						:props="defaultProps"
						default-expand-all
						:expand-on-click-node="true"
						highlight-current
						:current-node-key="curNodeId"
						@node-click="handleNodeClick"
					>
					</el-tree>
				</el-scrollbar>
			</div>
			<div class="right-content">
				<div class="top-panel">
					<el-date-picker
						v-model="searchDate"
						class="checkout-date-input s-item"
						type="monthrange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM"
						format="yyyy/M"
						:editable="false"
						clearable
					>
					</el-date-picker>
					<el-button
						class="search-btn op-item"
						icon="el-icon-search"
						type="primary"
						size="small"
						@click="handleSearchClick"
						>查询
					</el-button>
					<el-button
						class="reset-btn op-item"
						icon="el-icon-refresh-right"
						plain
						size="small"
						@click="handleResetClick"
						>刷新
					</el-button>
					<el-button
						class="search-btn op-item"
						type="primary"
						size="small"
						@click="handleTemplateDownload"
						>模板下载
					</el-button>
					<el-button class="search-btn op-item" type="primary" size="small" @click="handleImport"
						>一键导入
					</el-button>
					<!--		<el-button-->
					<!--		class="search-btn op-item"-->
					<!--		type="primary"-->
					<!--		size="small"-->
					<!--		@click="handleSearchClick"-->
					<!--		>一键导出-->
					<!--		</el-button>-->
					<el-button class="search-btn op-item" type="primary" size="small" @click="handleView"
						>查看数据
					</el-button>
				</div>
				<div class="table-box">
					<el-scrollbar>
						<div class="box-title">
							<span>已选基础数据列表:{{ selectedMenu }}</span>
							<!--            <span style="margin-left: 40px">必要性: 必须</span>-->
						</div>
						<el-table
							id="table-box-id"
							v-loading="loading"
							:data="tableData"
							:header-cell-style="tableHeaderStyle"
							:row-style="tableRowStyle"
							:cell-style="tableCellStyle"
							stripe
							@sort-change="handleCustomSort"
						>
							<el-table-column fixed type="index" label="序号" align="center" width="50">
								<template slot-scope="scope">
									<span>{{ (pageInfo.pageIndex - 1) * pageInfo.pageSize + scope.$index + 1 }}</span>
								</template>
							</el-table-column>
							<el-table-column
								align="center"
								prop="createTime"
								label="导入时间"
								sortable="custom"
								:formatter="formatTime"
							></el-table-column>
							<el-table-column align="center" prop="success" label="状态" width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.success" style="color: #42a84f;">导入成功</span>
									<span v-else style="color: #ce4545;">导入失败</span>
								</template>
							</el-table-column>
							<el-table-column align="center" prop="rowCount" label="数据检查结果">
								<template slot-scope="scope">
									<span>行数：{{ scope.row.rowCount }}</span>
								</template>
							</el-table-column>
							<el-table-column align="center" fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button
										v-if="scope.row.hasLog"
										type="text"
										size="small"
										class="table-op-link"
										@click="handleExport(scope.row.id)"
										>导出错误报告</el-button
									>
								</template>
							</el-table-column>
						</el-table>
					</el-scrollbar>
				</div>
				<div class="pager">
					<el-pagination
						:current-page.sync="pageInfo.pageIndex"
						:page-sizes="pageInfo.page_sizes"
						:page-size="pageInfo.pageSize"
						background
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageInfo.totalRowCount"
						style="text-align: center;"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					></el-pagination>
				</div>
			</div>
		</div>
		<!-- 对话框部分 -->
		<!-- 模板下载对话框开始 -->
		<el-dialog
			v-el-drag-dialog
			title="请选择下载模板文件类型"
			:visible.sync="dialogVisible"
			width="550px"
			top="25vh"
			:show-close="false"
			class="common-dialog"
		>
			<el-form
				ref="createDataFormRef"
				:model="dataForm"
				label-width="80px"
				label-position="right"
				:hide-required-asterisk="false"
			>
				<el-form-item label="文件类型">
					<el-select
						v-if="selectedMenu !== '科室二级分摊'"
						v-model="dataForm.fileType"
						placeholder="请选择"
						style="width: 100%;"
					>
						<el-option
							v-for="item in fileTypeOptios"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
					<el-select v-else v-model="dataForm.fileType" placeholder="请选择" style="width: 100%;">
						<el-option label="excel" value="xlsx"> </el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="common-dialog-button btn-cancel" @click="cancelModel">取 消</el-button>
				<el-button
					v-preventReClick="1000"
					type="primary"
					class="common-dialog-button btn-confrim"
					@click="confirmModel"
					>确 定</el-button
				>
			</div>
		</el-dialog>
		<!-- 模板下载对话框结束 -->
		<!-- 上传文件对话框开始 -->
		<Upload
			:visible.sync="visible"
			:upload-u-r-l="uploadURL"
			:limit-size="100"
			:target="target"
			accept=".xlsx,.csv"
			@loadDataList="uploadFinish"
		></Upload>
		<!-- 上传文件对话框结束 -->
	</div>
</template>

<script>
import { BaseDataList } from '@/utils/baseDataEnums';
import tableStyle from '@/mixins/tableStyle';
import UI from '@/mixins/ui';
import dateTimeUtil from '@/utils/dateTimeUtil';
import fileImportApi from '@/api/fileImport';

export default {
	components: {
		Upload: () => import('@/components/Upload/index')
	},
	mixins: [tableStyle, UI],
	data() {
		return {
			loading: false,
			curNodeId: 1,
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			leftSideMenu: [
				{
					id: 0,
					label: '基础数据列表',
					children: this.getSideMenus()
				}
			],
			selectedMenu: '',
			searchDate: [],
			tableData: [],
			sort: [],
			dialogVisible: false,
			dataForm: {
				fileType: 'xlsx'
			},
			fileTypeOptios: [
				{
					value: 'xlsx',
					label: 'excel'
				},
				{
					value: 'csv',
					label: 'csv'
				}
			],
			targetMenuMap: null,
			labelMenuArr: [],
			// 分页数据
			pageInfo: {
				page_sizes: [10, 20, 50, 100], //每页显示多少条的用户选择数组
				pageSize: 10, //每页显示几个 前端传 从用户页面获取
				totalRowCount: 1, //总条数 后台获取
				pageIndex: 1 //当前页
			},
			//一键导入
			visible: false,
			uploadURL: '',
			target: ''
		};
	},
	async created() {
		await this.initLoadData();
	},
	methods: {
		handleCustomSort({ column, prop, order }) {
			this.sort = [];
			if (prop === 'createTime') {
				//后端定义使用id
				prop = 'id';
			}
			let obj = {
				column: prop,
				order: order === 'ascending' ? 'asc' : 'desc'
			};
			this.sort.push(obj);
			this.initTableData();
		},
		handleView() {
			this.target = this.targetMenuMap.get(this.curNodeId);
			this.$router.push({
				path: '/baseDataManage/baseDataList/' + this.target
			});
		},
		handleExport(id) {
			this.loading = true;
			let url = '/importer/file/log';
			console.log(dateTimeUtil.format(new Date(), 'YYYY-MM-DD-HH-mm'));
			this.$http({
				method: 'GET',
				url: url,
				timeout: 300000,
				responseType: 'blob',
				params: {
					id: id
				}
			})
				.then((res) => {
					setTimeout(() => {
						let fileName =
							this.selectedMenu +
							'_错误报告_' +
							dateTimeUtil.format(new Date(), 'YYYY-MM-DD-HH-mm');
						this.downloadcreateUrl(res, fileName, 'xlsx');
						this.loading = false;
					}, 200);
				})
				.catch((err) => {
					console.log('导出err', err);
					this.loading = false;
				});
		},
		handleImport() {
			this.uploadURL = `/importer/file`;
			this.target = this.targetMenuMap.get(this.curNodeId);
			this.visible = true;
		},
		uploadFinish() {
			console.log('uploadFinish');
			this.initTableData();
		},
		cancelModel() {
			this.dialogVisible = false;
		},
		confirmModel() {
			let url = '/importer/file/template';
			let type = this.dataForm.fileType;
			let target = this.targetMenuMap.get(this.curNodeId);
			this.$http({
				method: 'GET',
				url: url,
				timeout: 300000,
				responseType: 'blob',
				params: {
					type: type,
					target: target
				}
			})
				.then((res) => {
					setTimeout(() => {
						this.downloadcreateUrl(res, target + '_template', type);
						this.dialogVisible = false;
					}, 200);
				})
				.catch((err) => {
					console.log('导出err', err);
					this.dialogVisible = false;
				});
		},
		handleTemplateDownload() {
			this.dataForm.fileType = 'xlsx';
			this.dialogVisible = true;
		},

		getSideMenus() {
			let obj = BaseDataList;
			let arr = [];
			this.targetMenuMap = new Map();
			Object.keys(obj).map((v, i) => {
				this.targetMenuMap.set(i + 1, v);
			});
			// console.log('this.targetMenuMap',this.targetMenuMap)
			Object.values(obj).map((v, i) => {
				let temp = {
					id: i + 1,
					label: v
				};
				arr.push(temp);
			});
			this.labelMenuArr = arr;
			return arr;
		},
		handleNodeClick(data, node, self) {
			if (data.id) {
				this.curNodeId = data.id;
				this.selectedMenu = data.label;
			} else {
				this.$nextTick(() => {
					// 新增以后选中新增节点
					this.$refs.leftSideTree.setCurrentKey(this.curNodeId);
				});
			}
			console.log('点击左侧树状菜单data:', data, ',node:', node);
			this.initTableData();
		},
		formatTime(row, column, cellValue) {
			return dateTimeUtil.formatTimeString(cellValue, 'YYYY年MM月DD日');
		},
		handleSizeChange(newSize) {
			console.log('Page Size 页面展示数据量改变 %s ', newSize);
			this.pageInfo.pageIndex = 1;
			this.pageInfo.pageSize = newSize;
			this.initTableData();
		},

		handleCurrentChange(curNo) {
			console.log('current Page No 当前页码发生变化 %s ', curNo);
			this.pageInfo.pageIndex = curNo;
			this.initTableData();
		},
		handleResetClick() {
			console.log('重置点击');
			this.searchDate = [];
			this.pageInfo.pageIndex = 1;
			this.pageInfo.pageSize = 10;
			this.initTableData();
		},
		handleSearchClick() {
			console.log('查询点击');
			this.pageInfo.pageIndex = 1;
			this.initTableData();
		},
		initLoadData() {
			let menuObj = this.getSideMenus().find((v) => v.id === this.curNodeId);
			console.log(menuObj);
			this.selectedMenu = menuObj.label;
			this.initTableData();
		},
		async initTableData() {
			this.loading = true;
			let params = {
				pageIndex: this.pageInfo.pageIndex,
				pageSize: this.pageInfo.pageSize,
				target: this.targetMenuMap.get(this.curNodeId),
				startTime: this.searchDate && this.searchDate.length ? this.searchDate[0] : null,
				endTime: this.searchDate && this.searchDate.length ? this.searchDate[1] : null,
				sort: this.sort
			};
			let res = await fileImportApi.getFilePage(params);
			if (res) {
				this.tableData = res.data;
				this.pageInfo.pageIndex = res.pageIndex;
				this.pageInfo.pageSize = res.pageSize;
				this.pageInfo.totalRowCount = res.totalRowCount;
			}
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.file-import {
	width: 100%;
	height: 100%;
	background: #fff;

	.content {
		box-sizing: border-box;
		padding: 32px 24px 47px 24px;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;

		.left-tree {
			width: 285px;
			border-right: 1px solid #d5d5d5;
			height: calc(100% - 14px);
			overflow: hidden;

			::v-deep .el-scrollbar {
				height: 100%;

				.el-scrollbar__wrap {
					overflow-x: hidden !important;
				}
			}
		}

		.right-content {
			transition: all 0.3s;
			flex: 1;

			.top-panel {
				display: flex;
				padding: 12px 24px;
				height: 56px;
				align-items: center;
				box-shadow: 0px 0px 2px 0px rgba(203, 203, 203, 0.6);

				.s-item + .s-item {
					margin-left: 16px;
				}

				.search-btn {
					margin-left: 16px;
				}

				.op-item + .op-item {
					margin-left: 8px;
				}
			}

			.table-box {
				height: calc(100% - 98px);
				padding-left: 24px;
				overflow: hidden;

				::v-deep .el-scrollbar {
					height: 100%;

					.el-scrollbar__wrap {
						overflow-x: hidden !important;
					}
				}

				.box-title {
					margin: 32px 0 16px 0;
					border-left: 3px solid #7e3689;
					padding-left: 8px;
					font-weight: bolder;
					font-size: 16px;
					color: #000;
				}

				::v-deep .el-table {
					width: 99% !important;
				}
			}

			.pager {
				display: flex;
				padding: 0 24px;
				justify-content: flex-end;
				margin-top: 10px;
			}
		}
	}
}
</style>
