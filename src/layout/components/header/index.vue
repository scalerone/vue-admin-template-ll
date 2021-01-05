<template>
	<div class="header">
		<div class="header_l">
			<!--		<a href="javascript:;" class="logoLink" v-if="opened"><img src="./logo.png" alt="logo" />量励</a>-->
			<span v-if="opened" class="logoLink"><img src="./logo.png" alt="logo" />管理</span>
			<span v-else class="logo-opened"><img src="./logo-open.png" alt="logo" width="102" /></span>
		</div>
		<div class="header_r">
			<div class="headr_d1">
				<side-collapse class="sidecoll"></side-collapse>
				<h2>后台数据管理中心</h2>
			</div>
			<div class="headr_d2">
				<ul class="headrUl clearFixed">
					<li id="domFullScreen">
						<full-screen></full-screen>
					</li>
					<li id="domPersonal">
						<user-dropdown></user-dropdown>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import SideCollapse from '@/components/SideCollapse';
import UserDropdown from '@/components/UserDropdown';
import FullScreen from '@/components/FullScreen';
import { mapGetters } from 'vuex';

export default {
	components: {
		SideCollapse,
		UserDropdown,
		FullScreen
	},
	data() {
		return {
			options: [],
			value: ''
		};
	},
	computed: {
		...mapGetters(['opened', 'roles'])
	},
	mounted() {},
	methods: {
		// toggleMsgShow() {
		// 	this.$store.commit('app/SET_MSGISOPEN');
		// },
	}
};
</script>
