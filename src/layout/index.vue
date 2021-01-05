<template>
	<div class="wrapper" :class="{ closeBar: opened }">
		<el-container id="layout">
			<el-aside :width="dynamicWidth">
				<side-bar></side-bar>
			</el-aside>

			<el-container class="right-wrapper">
				<!-- 头部导航 -->
				<el-header height="46px" class="top-header">
					<m-header></m-header>
				</el-header>
				<!-- 面包屑 -->
				<div class="bread-bar">
					<bread-crumb class="bread"></bread-crumb>
				</div>
				<!-- 内容区 -->
				<el-main class="body-main">
					<page-main></page-main>
				</el-main>
				<el-footer height="44px">xx技术有限公司</el-footer>
			</el-container>
		</el-container>
		<!-- <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutRight"
    >
      <notificat-bar v-show="msgIsShow"></notificat-bar>
    </transition> -->
		<!-- <div class="wrapper_con">
      <side-bar></side-bar>
      <page-main></page-main>
    </div> -->
	</div>
</template>

<script>
import SideBar from './components/sideBar';
import MHeader from './components/header';
import NotificatBar from '@/components/NotificatBar';
import PageMain from './components/PageMain';
import { mapGetters } from 'vuex';
import driver from '@/mixins/useDriver';
import BreadCrumb from '@/components/BreadCrumb';
export default {
	name: 'Layout',
	mixins: [driver],
	mounted() {
		// if (this.showDriver === 'yes') {
		// 	this.guide();
		// 	this.$store.commit('app/SET_DRIVER', 'no');
		// }
	},
	computed: {
		...mapGetters(['opened', 'msgIsShow', 'dynamicWidth', 'showDriver'])
	},
	components: {
		SideBar,
		MHeader,
		NotificatBar,
		PageMain,
		BreadCrumb
	}
};
</script>
