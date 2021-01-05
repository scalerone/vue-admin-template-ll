<template>
	<div class="page404 noPadding">
		<div class="page-box">
			<p class="page404_p0">{{ desc }}:(</p>
			<el-button @click="handleTryAgain">重新尝试</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			desc: '页面找不到啦 ',
			redirectPath: '/'
		};
	},

	mounted() {
		console.log('this.$route:');
		console.log(this.$route);
		this.desc = this.$route.params['desc'] || '页面找不到啦 ';
		this.redirectPath = this.$route.params['path'] || '/';
	},
	methods: {
		handleTryAgain() {
			// console.log('点击重新尝试 %o', this.redirectPath);
			if (this.redirectPath) {
				this.$router.push({ path: this.redirectPath });
			} else {
				this.$router.push({ path: '/' });
			}
		}
	}
};
</script>
<style scoped lang="scss">
.page404 {
	width: 100%;
	height: 100%;
	text-align: center;
	background: #b5c794 url(../../assets/404img/img-404.png) no-repeat center center !important;
	.page-box {
		display: flex;
		height: 100%;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	}
	.page404_p0 {
		font-size: 20px;
		color: #000;
		text-align: center;
		padding: 80px 0 20px 0;
	}
}
</style>
