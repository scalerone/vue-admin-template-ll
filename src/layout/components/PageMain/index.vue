<template>
	<div class="pageMain">
		<transition name="fade-page" mode="out-in">
			<!--      <keep-alive>-->
			<router-view v-if="!$route.meta.noCache" :key="key"></router-view>
			<!--      </keep-alive>-->
			<router-view v-if="$route.meta.noCache" :key="key"></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	computed: {
		key() {
			return this.$route.path;
		}
	}
};
</script>
