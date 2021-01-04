import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import "./assets/css/index.css";

// 引入iconfont样式
import "./assets/iconfont/iconfont.css";

// 引入ElemUI库
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; //引用element-ui 样式
Vue.use(ElementUI); //最后要use ElementUI ，不然会报错

// 导入进度条Nprogress包和css样式
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 全局引入富文本编辑器
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.component("mavon-editor", mavonEditor);

// 引入axios
import axios from "axios";
// 配置请求根路径
axios.defaults.baseURL = "http://localhost:5000";
// 将axios挂载到原型链上
Vue.prototype.$axios = axios;

// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ ease: "ease", speed: 500 });

// 在request拦截器中显示进度条NProgress.start();
//配置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  NProgress.start();
  // 最后必须return出去
  return config;
});

// 在reponse拦截器中隐藏进度条NProgress.done();
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
