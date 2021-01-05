import Vue from 'vue';
// 防止重复提交--参考文档
// https://juejin.im/post/5eb7fc626fb9a0436a7c6af1#heading-0
const preventReClick = Vue.directive('preventReClick', {
	inserted: function (el, binding) {
		el.addEventListener('click', () => {
			if (!el.disabled) {
				el.disabled = true;
				setTimeout(() => {
					el.disabled = false;
				}, binding.value || 3000); // 传入绑定值就使用，默认3000毫秒内不可重复触发
			}
		});
	}
});

export { preventReClick };
