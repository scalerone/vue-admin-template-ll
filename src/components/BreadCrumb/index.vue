<template>
	<div id="domBread" class="breadDiv">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="item.path">{{
				item.meta.title
			}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	data() {
		return {
			breadList: []
		};
	},
	watch: {
		$route: {
			handler(route) {
				let allList = route.matched.filter((item) => {
					item.path = '';

					if (item.meta && item.meta.title) {
						if (item.redirect) {
							item.path = '';
						}
						return true;
					}
				});
				if (allList[0].path && allList[0].path !== '/' && allList[0].path !== '/dashbord') {
					allList.unshift({ path: '/', meta: { title: '首页' } });
				}
				this.breadList = allList;
			},
			immediate: true
		}
	}
};
</script>
