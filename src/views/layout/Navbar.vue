<template>

<el-menu class="navbar" mode="horizontal">
  
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <tabs-view></tabs-view>
  <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
  <ul class="nav layout-right">
    <li class="nav-item" lay-unselect="">
      <a>
        <i class="wk-icon icon-notice"></i>
      </a>
    </li>
    <li class="nav-item">
      <a>
      <screenfull></screenfull>
      </a>
    </li>
    <li class="nav-item">
      <div>
        <img style="position:absolute;top:40%;transform:translateY(-50%);height:25px;border-radius: 50%;" :src="avatar"/>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <a>
        <div class="avatar-wrapper" style="padding: 0 15px;"><cite>{{name}}</cite> <i class="wk-icon icon-triangle-d"></i> </div>
        </a>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item> 版本：V1.0 </el-dropdown-item>
          <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</el-menu>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import Hamburger from 'components/Hamburger';
import Screenfull from 'components/Screenfull';
import ErrorLog from 'components/ErrLog';
import errLogStore from 'store/errLog';
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog
    }
  },
  computed: { ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut')
        .then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  background-color: #fff;
}
.wk-icon {
  color:#333333;
}
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    border-bottom: 1px solid transparent;
    box-shadow: 0 1px 4px rgba(0,21,41,0.08);
    li {
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .nav-item {
      height: 50px;
      line-height: 50px;
      min-width:50px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      a {
        display: block;
        padding: 0 20px;
      }
      
    }
    .nav {
        position: relative;
        padding: 0 20px;
        color: #fff;
        border-radius: 2px;
        font-size: 0;
        box-sizing: border-box;
    }
    .layout-right {
        position: absolute!important;
        right: 0;
        top: 0;
        outline: none;
    }
    .hamburger-container {
        // line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
        outline: none;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .avatar-container {
        height: 50px ;
        display: inline-block;   
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
            display: flex;
            // align-items:center; 
	          // justify-content:center;
            .user-avatar {
                width: auto;
                height: 40px;
                border-radius: 10px;
            }
            cite {
              color:#333;
              font-style: normal;
              font-size: 14px;
            }
            .icon-triangle-d {
                position: relative;
                font-size: 18px;
            }
        }
    }
}
</style>
