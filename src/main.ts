import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';

import VeeValidate from 'vee-validate';


Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

Vue.prototype.$eventBus = new Vue(); // Global event bus


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
