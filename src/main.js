import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from './store';
import './plugins/element.js';
import '@/style/index.scss'; // global scss
import animated from 'animate.css';
import '@/assets/iconfont/iconfont.css';
import axios from 'axios';
import '@/utils/prototype'; //Vue.prototype
import './permission'; // permission control

Vue.use(animated);

import VueParticles from 'vue-particles';
Vue.use(VueParticles); //登录页面使用的粒子效果

/** 注册全局指令 */
import preventReClick from '@/directive/preventReClick.js'; //防多次点击，重复提交
import elDragDialog from '@/directive/el-drag-dialog'; // base on element-ui 弹窗可拖拽
Vue.use(elDragDialog.install);

Vue.prototype.$http = axios; // 并发请求用
Vue.prototype.$eventbus = new Vue();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
