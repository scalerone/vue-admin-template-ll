<template>
	<div class="base-data-list-wrapper whole-hospital-income">
		<div class="iframe-box">
			<div class="analysis-main-box">
				<iframe
					frameborder="0"
					class="iframe-contain"
					name="iframeContain"
					seamless
					scrolling="yes"
					:src="menuUrl"
				>
					您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
				</iframe>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/api/allocationSetting/allocationSolution.js';
import baseDataListMixin from '@/mixins/baseDataListMixin';

export default {
	name: 'AnalysisCommon',
	mixins: [baseDataListMixin],
	data() {
		return {
			api,
			menuUrl: '',
			timer: undefined
		};
	},

	created() {
		this.menuUrl = this.$route.meta.url;
	},
	mounted() {},
	methods: {}
};
</script>
