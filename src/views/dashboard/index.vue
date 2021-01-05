<template>
	<div class="homeBox">
		<components :is="componentOn" />
	</div>
</template>

<script>
import adminComponent from './admin';
import userComponent from './user';
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['roles']),
		componentOn() {
			if (this.roles[0] !== 'hospital_operator') {
				return 'adminComponent';
			} else {
				return 'adminComponent';
			}
		}
	},
	components: {
		adminComponent,
		userComponent
	}
};
</script>

<style lang="scss" scoped>
.homeBox {
	width: 100%;
	height: 100%;
	text-align: center;
	background: #fafbff url(../../assets/pageBg/homeBg.png) no-repeat center center !important;
}
</style>
