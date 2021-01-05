// 29个表
export const BaseDataList = {
	hospital_dept: '医院成本科室数据',
	base_pro_income: '医院收费项目数据',
	base_medicine: '医院药品目录数据',
	base_material: '医院卫生材料目录数据',
	base_medicine_pur_price: '医院药品进价数据',
	base_material_pur_price: '医院卫生材料进价数据',
	base_account_sub_other: '医院其他费用类会计科目数据',
	base_dept_area: '医院科室面积数据',
	base_service_audept: '医院内部服务项目数据',
	operate_salary: '医院工资发放数据',
	operate_dept_income: '医院收入数据',
	operate_dept_medicine: '医院药品消耗数据',
	operate_dept_material: '医院卫生材料消耗数据',
	operate_dept_assets: '医院固定资产折旧与无形资产摊销数据',
	operate_dept_finance: '医院财务凭证采集数据',
	operate_dept_cost: '医院科室成本账单采集数据',
	operate_dept_work_out: '医院门诊工作量数据',
	operate_dept_work_in: '医院病区工作量数据',
	operate_dept_service_audept: '医院单元服务采集数据',
	operate_dept_work_techno: '医院医技工作量数据',
	operate_dept_plan_income_detail: '医院计划数据',
	operate_workers_group: '医院诊疗组数据',
	operate_workers: '职工信息',
	operate_patient_icu: '医院ICU数据',
	operate_patient_techno: '病例医技服务项目使用',
	operate_patient_operation: '手术时间参数数据',
	operate_patient_change: '住院转科记录',
	base_drg_price_nhsa: '医保DRG定价',
	dept_cost_proportion_lv2: '科室二级分摊'
};
// 30个表
export const BaseDataAllList = {
	...BaseDataList,
	cms_ba_cl: '病案首页数据',
	case_dept_collection: '病例数据的归集'
};
// 连接方式
export const ConnType = {
	1: '数据库连接'
	// 2: '接口连接'
};
// 数据库类型
export const DatabaseType = {
	SqlServer: 'SqlServer',
	MySql: 'MySql',
	Oracle: 'Oracle'
};
// 接口类型
export const InterfaceType = {
	webservice: 'webservice',
	'webAPI(JSON)': 'webAPI(JSON)',
	wu: '无'
};
/* 医院成本科室数据 */
// HIS科室属性
export const HisOutOrInList = {
	门诊: '门诊',
	住院: '住院'
};
// 组长属性
export const IsGroupLeader = {
	'01': '是',
	'02': '否'
};
// 核算分类码
export const MedTypeCodeList = {
	'01': '01西药',
	'02': '02中草药',
	'03': '03中成药'
};
export const InvTypeCodeList = {
	'11': '血费',
	'12': '氧气',
	'13': '放射材料',
	'14': '化验材料',
	'17': '其他卫材'
};
export const EmpTitleList = {
	初级: '初级',
	中级: '中级',
	高级: '高级',
	其他: '其他'
};
export const EmpProList = {
	医生: '医生',
	护士: '护士',
	管理: '管理',
	医技: '医技',
	其他: '其他'
};
// 经费数据来源
export const FundSourceList = {
	财政: '财政',
	自筹: '自筹',
	科教: '科教'
};
// 资产类型
export const AssetTypeList = {
	房屋及建筑物: '房屋及建筑物',
	专用设备: '专用设备',
	一般设备: '一般设备',
	其他固定资产: '其他固定资产',
	无形资产: '无形资产'
};

export const MedHomePropsMap = {
	bah: '病案号',
	rysj: '入院时间',
	cysj: '出院时间',
	sjzyts: '住院天数',
	cykb: '出院科室编码',
	cybf: '出院科室名称',
	RETIRED_PAY_LX: 'DRG入组状态',
	RETIRED_PAY_TX: '专科专治',
	RETIRED_PAY_TZ: 'MDC',
	COMFORT_PAY: 'DRG编码',
	LIVING_PAY: 'DRG名称',
	RELIEF_PAY: 'drg权重',
	MEDICAL_PAY: '出院主诊断',
	BOUNTY_PAY: '出院主治疗',
	HOUSING_PAY: 'CMI',
	RETING_PAY: '性别',
	BUY_HOUSE_PAY: '年龄'
	// ELSE_PER_PAY: '离院方式',
	// ELSE_PER_PAY: '科主任',
	// ELSE_PER_PAY: '主治医师',
	// ELSE_PER_PAY: '住院医师',
	// ELSE_PER_PAY: '住院费用(元)：总费用',
	// ELSE_PER_PAY: '标杆费用',
	// ELSE_PER_PAY: '1综合医疗服务类：(1)一般医疗服务费',
	// ELSE_PER_PAY: '2一般治疗操作费',
	// ELSE_PER_PAY: '3护理费住院费',
	// ELSE_PER_PAY: '4其他费用',
	// ELSE_PER_PAY: '5诊断类：(5)病理诊断费',
	// ELSE_PER_PAY: '6实验室诊断费',
	// ELSE_PER_PAY: '7影像学诊断费',
	// ELSE_PER_PAY: '8临床诊断项目费',
	// ELSE_PER_PAY: '9治疗类：(9)非手术治疗项目费',
	// ELSE_PER_PAY: '10手术治疗费',
	// ELSE_PER_PAY: '11康复类：(11)康复费',
	// ELSE_PER_PAY: '12中医类(中医和民族医服务)（12）中医诊断',
	// ELSE_PER_PAY: '13中医治疗费',
	// ELSE_PER_PAY: '13.01中医外治',
	// ELSE_PER_PAY: '13.02中医骨伤',
	// ELSE_PER_PAY: '13.03针刺与灸法',
	// ELSE_PER_PAY: '13.04中医推拿治疗',
	// ELSE_PER_PAY: '13.05中医肛肠治疗',
	// ELSE_PER_PAY: '13.06中医特殊治疗',
	// ELSE_PER_PAY: '14中医其他',
	// ELSE_PER_PAY: '15西药类(15)西药费',
	// ELSE_PER_PAY: '16中药类(16)中成药费',
	// ELSE_PER_PAY: '17中草药费',
	// ELSE_PER_PAY: '18血液和血液制品类(18)血费',
	// ELSE_PER_PAY: '19白蛋白类制品费',
	// ELSE_PER_PAY: '20球蛋白类制品费',
	// ELSE_PER_PAY: '21凝血因子类制品费',
	// ELSE_PER_PAY: '22细胞因子类制品费',
	// ELSE_PER_PAY: '23耗材类(23)检查用一次性医用材料费',
	// ELSE_PER_PAY: '24治疗用一次性医用材料费',
	// ELSE_PER_PAY: '25手术用一次性医用材料费',
	// ELSE_PER_PAY: '26其他类(26)其他费',
};

//成本核算方式
export const CostWayList = {
	1: '医疗成本',
	2: '医疗直接成本',
	3: '医疗全成本',
	4: '医院全成本'
};

// 科室属性
export const DeptAttributeList = {
	'01': '病房',
	'02': '手术麻醉科室',
	'03': 'ICU'
};
//病案首页 chsDrgStatus
export const ChsDrgStatus = {
	'1': '进入分组器且入组',
	'2': '进入分组器但未入组，编码未识别',
	'3': '未进入分组器且住院天数>60天',
	'4': '未进入分组器且总费用<5元',
	'5': '未进入分组器且住院天数>60天,总费用<5元',
	'6': '无效且年龄为空',
	'7': '无效且非男非女',
	'8': '无效且年龄为空,非男非女',
	'9': '进入分组器但未入组，歧义病案',
	'10': '进入分组器但未入组，其他原因'
};
//科室类型
export const DeptType = {
	1: '行政后勤类科室',
	2: '医疗辅助类科室',
	3: '医疗技术类科室',
	4: '临床科室'
};
