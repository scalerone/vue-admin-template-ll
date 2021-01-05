<template>
	<div class="base-data-list-wrapper cost-res-check">
		<div class="top-panel">
			<el-select
				v-model="searchCondition.planId"
				class="option-select op-item"
				placeholder="分摊方案"
				style="width: 200px;"
				no-data-text="暂无数据请先计算"
				size="mini"
			>
				<el-option v-for="item in planList" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<el-date-picker
				v-model="searchDate"
				class="op-item"
				type="monthrange"
				range-separator="至"
				start-placeholder="核算开始时间"
				end-placeholder="核算结束时间"
				value-format="yyyy-MM"
				format="yyyy/MM"
				:editable="false"
				clearable
			>
			</el-date-picker>

			<el-button
				class="search-btn op-item"
				icon="el-icon-search"
				type="primary"
				size="small"
				@click="handleSearchClick($event, customSearch)"
				>查询
			</el-button>
			<el-button
				class="reset-btn op-item"
				icon="el-icon-refresh-right"
				plain
				size="small"
				@click="handleResetClick($event, customClearFields)"
				>刷新
			</el-button>
			<el-button class="add-btn" type="primary" size="small" @click="handleClickCheck"
				>一键检查</el-button
			>
		</div>
		<div class="table-box">
			<div class="box-title">
				<span>{{ this.$route.meta.title }}</span>
			</div>
			<el-table
				id="table-box-id"
				ref="table"
				v-loading="loading"
				:data="tableData"
				:header-cell-style="tableHeaderStyle"
				:row-style="tableRowStyle"
				:cell-style="tableCellStyle"
				stripe
				:height="tableHeight"
				tooltip-effect="light"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="index"
					:show-overflow-tooltip="true"
					label="序号"
					align="center"
					width="50"
					fixed
				>
					<template slot-scope="scope">
						<span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="accountingRangeBegin"
					label="核算开始时间"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					align="center"
					prop="accountingRangeEnd"
					label="核算结束时间"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					align="center"
					prop="apportionPlanName"
					label="分摊方案"
					:show-overflow-tooltip="true"
				></el-table-column>
				<el-table-column
					align="center"
					prop="createTime"
					label="检查时间"
					:show-overflow-tooltip="true"
					:formatter="formatTime2"
				></el-table-column>
				<el-table-column align="center" fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="table-op-link" @click="handleView(scope.row)"
							>查看检查结果</el-button
						>
						<el-button
							type="text"
							size="small"
							class="table-op-link"
							style="margin-left: 8px;"
							@click="handleExport(scope.row.id)"
							>导出检查结果</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pager">
			<el-pagination
				:current-page.sync="pageIndex"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageSize"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalRowCount"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>

		<!-- 核算日期模态框 -->
		<el-dialog
			v-el-drag-dialog
			class="common-dialog"
			top="20vh"
			title="请选择"
			width="500px"
			:show-close="false"
			:visible="visibleDateDialog"
		>
			<el-form ref="form" class="common-form" label-width="150px" :model="formData" :rules="rules">
				<el-form-item label="分摊方案：" prop="planId">
					<el-select
						v-model="formData.planId"
						class="option-select"
						placeholder="请选择"
						style="width: 200px;"
						no-data-text="暂无数据请先计算"
						size="mini"
						@change="handleSearchPlanChange"
					>
						<el-option v-for="item in planList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="分摊方案核算时间：" prop="dateIndex">
					<el-select
						v-model="formData.dateIndex"
						class="option-select"
						placeholder="核算期间"
						style="width: 200px;"
						no-data-text="暂无数据请先选择分摊方案"
						size="mini"
					>
						<el-option
							v-for="(item, index) in dateList"
							:key="index + item.begin"
							:label="item.begin + '至' + item.end"
							:value="index"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="common-dialog-button btn-cancel" @click="visibleDateDialog = false"
					>取 消</el-button
				>
				<el-button
					v-preventReClick="1000"
					class="common-dialog-button btn-confrim"
					@click="handleConfirmDateDialog"
					>确 认</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import api from '@/api/calcResCheck/costResCheck.js';
import costCalcListApi from '@/api/costCalc/costCalcList.js';
import baseDataListMixin from '@/mixins/baseDataListMixin';
import { CostWayList } from '@/utils/baseDataEnums';
import dateTimeUtil from '@/utils/dateTimeUtil';

export default {
	mixins: [baseDataListMixin],
	data() {
		return {
			api,
			wrapperClass: '.cost-res-check',
			costWayList: this.generateOptions(CostWayList),
			searchDate: [],
			planList: [],
			dateList: [],
			dateIndex: null,
			// 查询条件
			searchCondition: {
				// 查询关键字
				planId: null,
				sort: [],
				accountingPeriodBegin:
					this.searchDate && this.searchDate.length ? this.searchDate[0] : null,
				accountingPeriodEnd: this.searchDate && this.searchDate.length ? this.searchDate[1] : null
			},

			//--------------核算日期模态框-----------
			visibleDateDialog: false,
			// 添加/编辑表单
			formData: {
				planId: '',
				dateIndex: null
			},
			rules: {
				planId: [
					{
						required: true,
						message: '请输入分摊方案名称',
						trigger: 'blur,change'
					}
				],
				dateIndex: [
					{
						required: true,
						message: '请选择分摊方案核算时间',
						trigger: 'blur,change'
					}
				]
			}
		};
	},
	async created() {
		this.planList = (await costCalcListApi.getComputedPlanAll()) || [];
	},
	methods: {
		handleExport(id) {
			this.loading = true;
			let url = '/compute/verify/item/file';
			console.log(dateTimeUtil.format(new Date(), 'YYYY-MM-DD-HH-mm'));
			this.$http({
				method: 'GET',
				url: url,
				timeout: 300000,
				responseType: 'blob',
				params: {
					listId: id
				}
			})
				.then((res) => {
					setTimeout(() => {
						let fileName = '检查结果_' + id + dateTimeUtil.format(new Date(), 'YYYY-MM-DD-HH-mm');
						this.downloadcreateUrl(res, fileName, 'xlsx');
						this.loading = false;
					}, 200);
				})
				.catch((err) => {
					console.log('导出err', err);
					this.loading = false;
				});
		},
		//--------------核算日期模态框-----------
		handleConfirmDateDialog() {
			this.$refs.form.validate(async (valid) => {
				if (!valid) return;
				let params = {
					planId: this.formData.planId,
					begin: this.dateList[this.formData.dateIndex].begin,
					end: this.dateList[this.formData.dateIndex].end
				};
				let res = await this.api.create(params);
				if (res) {
					this.$message.success('检查成功');
					this.get();
					this.visibleDateDialog = false;
				}
			});
		},

		//--------------搜索栏-----------
		async handleSearchPlanChange(val) {
			this.dateList = await costCalcListApi.getComputedPlanPeriod(val);
		},
		//一键检查
		handleClickCheck() {
			this.visibleDateDialog = true;
			this.$nextTick(() => {
				// 清空表单
				this.clearForm();
				this.clearValidate();
			});
		},
		// 自定义清除条件
		customClearFields() {
			this.dateIndex = null;
			this.searchCondition.planId = null;
			this.searchDate = [];
			this.searchCondition.accountingPeriodBegin = null;
			this.searchCondition.accountingPeriodEnd = null;
		},
		// 自定义搜索条件
		customSearch() {
			this.searchCondition.accountingPeriodBegin =
				this.searchDate && this.searchDate.length ? this.searchDate[0] : null;
			this.searchCondition.accountingPeriodEnd =
				this.searchDate && this.searchDate.length ? this.searchDate[1] : null;
			if (this.searchCondition.accountingPeriodBegin != null) {
				let obj = {
					column: 'accountingRangeBegin',
					order: 'asc'
				};
				this.searchCondition.sort.push(obj);
			}
		},
		// 查询
		handleSearchClick(event, callBack) {
			callBack && callBack();
			this.pageIndex = 1;
			// this.cleartSort();
			this.get();
		}
	}
};
</script>

<style lang="scss">
.dialog-check-result {
	.body-table-box {
		.page {
			display: flex;
			justify-content: flex-end;
			margin-top: 10px;
			width: 1116px;
		}
	}
}
</style>
