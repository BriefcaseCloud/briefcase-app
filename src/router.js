import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/auth/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/user/:userId/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
    ],
});
//# sourceMappingURL=router.js.map