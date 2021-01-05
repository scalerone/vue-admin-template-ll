<template>
	<div v-if="!item.hidden" class="sideItem">
		<template
			v-if="hasOnlyChild(item.children, item) && (!childItem.children || childItem.noChild)"
		>
			<page-link v-if="childItem.meta" :to="resolvePath(childItem.path)">
				<el-menu-item :index="resolvePath(childItem.path)" @click="reload(item)">
					<i :class="childItem.meta.icon ? childItem.meta.icon : ''"></i>
					<span slot="title" :title="childItem.meta.title">{{ childItem.meta.title }}</span>
				</el-menu-item>
			</page-link>
		</template>
		<el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
			<template slot="title">
				<i :class="item.meta.icon ? item.meta.icon : ''"></i>
				<span>{{ item.meta.title }}</span>
			</template>
			<sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:item="child"
				:base-path="resolvePath(child.path)"
			></sidebar-item>
		</el-submenu>
	</div>
</template>

<script>
import PageLink from './Link';
import { isAbsolutePath } from '@/utils/validate';
import path from 'path';
export default {
	name: 'SidebarItem',
	components: {
		PageLink
	},
	props: {
		item: {
			type: Object,
			required: true
		},
		basePath: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			childItem: null
		};
	},
	methods: {
		hasOnlyChild(children = [], item) {
			// debugger
			let newChildren = children.filter((obj) => {
				if (obj.hidden) {
					return false;
				} else {
					return true;
				}
			});
			if (newChildren.length === 1 && !item.meta) {
				this.childItem = newChildren[0];
				return true;
			}
			if (newChildren.length === 0) {
				this.childItem = { ...item, path: '', noChild: true };
				return true;
			}
			return false;
		},
		resolvePath(router) {
			if (isAbsolutePath(router)) {
				return router;
			}
			if (isAbsolutePath(this.basePath)) {
				return this.basePath;
			}
			return path.join(this.basePath, router);
		},
		// 点击重载
		reload(item) {
			// 如果发现当前路由与点击的路由一致就携带路由路径跳转到redirect页面
			// console.log('this.$route.name',this.$route.name)
			// console.log('item.name',item.name)
			if (this.$route.name === item.name) {
				this.$nextTick(() => {
					// params 默认会解析成为path字段,如果使用参数的形式 / 会来解析成为%
					this.$router.replace({
						path: '/redirect' + this.$route.fullPath
					});
				});
			}
		}
	}
};
</script>
<style lang="scss">
.sideItem {
	.el-submenu .el-menu-item {
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>
