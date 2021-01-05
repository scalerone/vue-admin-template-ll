<template>
	<div class="full-screen">
		<i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
	</div>
</template>

<script>
import screenfull from 'screenfull';
export default {
	methods: {
		toggleFull() {
			if (!screenfull.enabled) {
				this.$message({
					type: 'warning',
					message: 'you browser can not work'
				});
				return false;
			}
			screenfull.toggle();
		}
	}
};
</script>
<style lang="scss" scoped>
.full-screen {
	.el-icon-full-screen {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: -8px;
			right: -8px;
			bottom: -8px;
			left: -8px;
		}
	}
}
</style>
