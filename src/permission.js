import router from './router';
import store from './store';
import { getToken } from '@/utils/auth'; // get token from cookie

import getTitle from '@/utils/getTitle';
// import el from "element-ui/src/locale/lang/el";

const whiteList = ['/login']; // no redirect whitelist


// 导航守卫
router.beforeEach(async (to, from, next) => {
	// set page title
	document.title = getTitle(to.meta.title);

	// determine whether the user has logged in
	const hasToken = getToken();

	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' });
		} else {
			// determine whether the user has obtained his permission roles through getInfo
			const hasRoles = store.getters.roles && store.getters.roles.length > 0;
			if (hasRoles) {
				next();
			} else {
				try {
					// get user info
					// note: roles must be a object array! such as: ['admin'] or ,['developer','editor']--- 这里不是后端返回的
					const { role } = await store.dispatch('user/_getInfo');

					// generate accessible routes map based on roles
					const accessRoutes = await store.dispatch('permission/getAsyncRoutes', [role]);
					// console.log("accessRoutes", accessRoutes)
					window.localStorage.setItem('addRoutes', JSON.stringify(accessRoutes));

					// dynamically add accessible routes
					router.addRoutes(accessRoutes);

					// hack method to ensure that addRoutes is complete
					// set the replace: true, so the navigation will not leave a history record
					next({ ...to, replace: true });
				} catch (error) {
					console.log(error);
					// remove token and go to login page to re-login
					await store.dispatch('user/resetToken');
					next(`/login?redirect=${to.path}`);
				}
			}
		}
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next();
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`);
		}
	}
});
