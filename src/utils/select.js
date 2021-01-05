// 多选、全选、带过滤Select的change事件封装
export function mulAllFilterSelectChange(e, vModelVal, sourceList, oldList, callBack) {
	let allValues = [];
	//保留所有值
	for (let item of sourceList) {
		allValues.push(item.deptCode);
	}
	// 用来储存上一次的值，可以进行对比
	const oldVal = oldList.length === 1 ? [] : oldList[1];
	// 若是全部选择
	if (e.includes('全选')) vModelVal = allValues;
	// 取消全部选中  上次有 当前没有 表示取消全选
	if (oldVal.includes('全选') && !e.includes('全选')) vModelVal = [];
	// 点击非全部选中  需要排除全部选中 以及 当前点击的选项
	// 新老数据都有全部选中
	if (oldVal.includes('全选') && e.includes('全选')) {
		const index = e.indexOf('全选');
		e.splice(index, 1); // 排除全选选项
		vModelVal = e;
	}
	//全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
	if (!oldVal.includes('全选') && !e.includes('全选')) {
		console.log(11);
		if (e.length === allValues.length - 1) vModelVal = ['全选'].concat(e);
	}
	//储存当前最后的结果 作为下次的老数据
	oldList[1] = vModelVal;
	callBack && callBack();
}
