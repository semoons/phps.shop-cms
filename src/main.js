import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import req from './common/axios.js' //封装后的req 
Vue.prototype.req = req	//全局

Vue.config.productionTip = false;
Vue.prototype.API_PROXY = ''  //API网址
Vue.use(ElementUI);


//这是第一次用vue做项目，边学边做。代码很粗糙，后期会不断优化。
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
