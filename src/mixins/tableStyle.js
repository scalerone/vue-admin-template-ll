export default {
	methods: {
		tableHeaderStyle({ rowIndex }) {
			if (rowIndex === 0) {
				return `
                    background:rgba(242,238,255,1);
                    height: 45px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #444;
                    `;
			}
		},
		tableRowStyle({ rowIndex }) {
			return `
                cursor: pointer;
                background: ${rowIndex % 2 === 0 ? 'white' : '#F5F8FC'};
                height: 46px;
                font-size: 12px;
                font-weight: 400;
                color: #333333;
            `;
		},
		tableRowStyleNoCursor({ rowIndex }) {
			return `
                background: ${rowIndex % 2 === 0 ? 'white' : '#F5F8FC'};
                height: 46px;
                font-size: 12px;
                font-weight: 400;
                color: #333333;
            `;
		},
		tableCellStyle() {
			return `
                border-bottom: none;
            `;
		},
		relayout(self, ref, dom) {
			return function () {
				let scrollTimer;
				clearTimeout(scrollTimer);
				scrollTimer = setTimeout(() => {
					self.$refs[ref].doLayout();
				}, 300);
			};
		},
		// 动态计算表格高度，刷新表格布局
		refreshTable(ref, adjustHeight, heightName, self) {
			return function () {
				self.$nextTick(() => {
					if (self.$refs[ref]) {
						let res =
							window.innerHeight - self.$refs[ref].$el.getBoundingClientRect().top - adjustHeight;
						self[heightName] = res;
						// 解决element-table的fixed列resize错位问题
						// self.relayout(self, ref)();
						self.$refs[ref].doLayout();
					}
				});
			};
		},
		// 表格是否需要排序
		isColumnSortable(column, targets, type) {
			if (column in targets) return type;
			return false;
		}
	}
};
