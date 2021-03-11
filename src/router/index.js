import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('error/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dataPool/list',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dataPool',
    component: _import('business/dataPool/index')
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '简述'
  }]
},{
  path: '/dataPool',
  component: Layout,
  name: '数据池',
  authority: 'dataPool',
  children: [{
    path: 'list',
    component: _import('business/dataPool/index'),
    name: '数据池管理',
    authority: 'dataPool'
  }]
},{
  path: '/project',
  component: Layout,
  name: '沙盘',
  authority: 'project',
  children: [{
    path: 'list',
    component: _import('business/project/index'),
    name: '沙盘',
    authority: 'project'
  }]
},{
  path:'detail',
  component: Layout,
  name:'沙盘详情',
  children:[{
    path: '/content',
    component: _import('business/detail/index'),
    children:[{
      path: '',
      components:{
        default:_import("business/detail/ybp/index"),
        family_detail:_import("business/detail/family/index"),
        theme_detail:_import("business/detail/theme/index"),
        segment_detail:_import("business/detail/segment/index")
      }
    }]
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});


export const asyncRouterMap = [{
  path: '/baseManager',
  component: Layout,
  name: '账户权限',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    name:"用户管理",
    component: _import('admin/base/user/index'),
    authority: 'userManager'
  }, {
    path: 'menuManager',
    component: _import('admin/base/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    component: _import('admin/base/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    component: _import('admin/base/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    component: _import('admin/base/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }]
}
];
