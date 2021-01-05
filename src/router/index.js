import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/layout';
import NavTest from './modules/nav-test'


/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * roles: ['admin','editor']    control the page roles (you can set multiple roles)
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
	{
		path: '/redirect/:path*',
		hidden: true,
		component: () => import('@/views/redirect/index')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login'),
		meta: { title: '登录页' },
		hidden: true
	},
	{
		path: '/',
		name: 'Home',
		component: Layout,
		redirect: '/dashbord',
		children: [
			{
				path: 'dashbord',
				name: 'Dashbord',
				component: () => import('@/views/dashboard'),
				meta: { title: '首页', icon: 'el-icon-s-data' }
			}
		]
	},
	{
		path: '/404',
		name: 'outerError',
		component: () => import('@/views/error-page/404.vue'),
		hidden: true
	}
];
/*动态添加routers*/
export const asyncRoutes = [
	{
		path: '/example',
		name: 'Example',
		redirect: '/example/table',
		component: Layout,
		meta: {
			title: '使用示例',
			icon: 'el-icon-jisuanjieguojiancha iconfont',
			roles: ['admin']
		},
		children: [
			{
				path: 'table',
				name: 'Table',
				component: () => import('@/views/example/table'),
				meta: { title: '可滚动表格' }
			},
			{
				path: 'file',
				name: 'File',
				component: () => import('@/views/example/file/index.vue'),
				meta: { title: '文件导入导出' }
			}
		]
	},
	// {
	// 	path: '/dataAnalysis',
	// 	name: 'DataAnalysis',
	// 	redirect: '/dataAnalysis/baseAnalysis',
	// 	component: Layout,
	// 	meta: {
	// 		title: '统计分析',
	// 		icon: 'el-icon-juecefenxi iconfont',
	// 		roles: ['admin']
	// 	},
	// 	children: [
	// 		{
	// 			path: 'baseAnalysis',
	// 			name: 'BaseAnalysis',
	// 			component: () => import('@/views/dataAnalysis/AnalysisCommon'),
	// 			meta: { title: '基本数据分析', url: '/ibi/render.html?shareid=y58Qi0ep' }
	// 		},
	// 		{
	// 			path: 'suppAnalysis',
	// 			name: 'SuppAnalysis',
	// 			component: () => import('@/views/dataAnalysis/AnalysisCommon'),
	// 			meta: { title: '补充数据分析', url: '/ibi/render.html?shareid=o6cLhfsj' }
	// 		},
	// 		{
	// 			path: 'diseaseAnalysis',
	// 			name: 'DiseaseAnalysis',
	// 			component: () => import('@/views/dataAnalysis/AnalysisCommon'),
	// 			meta: { title: '疾病数据分析', url: '/ibi/render.html?shareid=4MB7CZDV' }
	// 		}
	// 	]
	// },
	// {
	// 	path: '/system',
	// 	name: 'system',
	// 	component: Layout,
	// 	redirect: '/system',
	// 	children: [
	// 		{
	// 			path: 'system',
	// 			name: 'systemHome',
	// 			component: () => import('@/views/error-page/norights'),
	// 			meta: { title: '系统管理', icon: 'el-icon-s-tools' }
	// 		}
	// 	]
	// },
	// {
	// 	path: '/account',
	// 	name: 'account',
	// 	component: Layout,
	// 	redirect: '/account',
	// 	children: [
	// 		{
	// 			path: 'account',
	// 			name: 'accountHome',
	// 			component: () => import('@/views/error-page/norights'),
	// 			meta: { title: '账号管理', icon: 'el-icon-s-custom' }
	// 		}
	// 	]
	// },
  {
    path: 'https://baidu.com/',
    name: 'Github',
    meta: { icon: 'el-icon-link', title: '外部链接' }
  },
  NavTest,
	{
		path: '/error',
		component: Layout,
		name: 'innerError',
		redirect: '/error/404',
		hidden: true,
		children: [
			{
				path: '404',
				name: 'Page404',
				component: () => import('@/views/error-page/404'),
				hidden: true
			}
		]
	},
	{
		path: '*',
		name: '*404',
		redirect: '/404',
		hidden: true
	}
];
const creatRouter = () => {
	return new Router({
		routes: currencyRoutes,
		scrollBehavior() {
			return { x: 0, y: 0 };
		}
	});
};

const router = creatRouter();

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
	const reset = creatRouter();
	router.matcher = reset.matcher;
}

export default router;
