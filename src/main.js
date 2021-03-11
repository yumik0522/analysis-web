// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/custom-theme/index.css'; // 换肤版本element-ui css
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
import Sticky from 'components/Sticky'; // 粘性header组件
import IconSvg from 'components/Icon-svg';// svg 组件
import vueWaves from './directive/waves';// 水波纹指令
import errLog from 'store/errLog';// error log组件
import './mock/index.js';  // 该项目所有请求使用mockjs模拟
// import { getToken } from 'utils/auth';
import 'babel-polyfill';//支持IE执行原生script
import './utils/directives.js';//支持窗口拖拽
import VueQuillEditor from 'vue-quill-editor';
import '../static/font-awesome-4.7.0/css/font-awesome.min.css';
import moment from 'moment';


// fontawesome.library.add(solid)
// fontawesome.library.add(regular)
// fontawesome.library.add(brands)

// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$moment = moment;


// register globally
Vue.component('multiselect', Multiselect);
Vue.component('Sticky', Sticky);
Vue.component('icon-svg', IconSvg)
Vue.use(ElementUI);
Vue.use(vueWaves);
Vue.use(VueQuillEditor);


// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// register global progress.
// const whiteList = ['/login', '/authredirect'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

Vue.config.productionTip = false;

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
