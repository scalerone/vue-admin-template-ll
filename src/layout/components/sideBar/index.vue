<template>
	<div id="domSideBar" class="sideBar">
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				class="el-menu-vertical-demo"
				background-color="#432758"
				text-color="#b5b6bd"
				active-text-color="#fff"
				mode="vertical"
				:collapse-transition="false"
				:collapse="opened"
			>
				<sidebar-item
					v-for="item in routes"
					:key="item.path"
					:item="item"
					:base-path="item.path"
				></sidebar-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import SidebarItem from './SideBarItem';
import { mapGetters } from 'vuex';
export default {
	components: { SidebarItem },
	data() {
		return {
			pathMenu: null
		};
	},
	computed: {
		...mapGetters(['routes', 'opened']),
		// booleanOpen() {
		//   return this.opened === 'true' ? true : false
		// },
		activeMenu() {
			let path = this.$route.path;
			if (this.pathMenu != null) {
				path = this.pathMenu;
			}
			return path;
		}
	},
	mounted() {
		//这里使用监听器针对决策分析的iframe中cboard下钻页面的同步高亮
		//----AnalysisCommon页面触发
		this.$eventbus.$on('Analysis', (menu) => {
			this.pathMenu = menu;
		});
	},
	methods: {}
};
</script>
