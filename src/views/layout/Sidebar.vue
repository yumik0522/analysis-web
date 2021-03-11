<template>
    <el-menu mode="vertical"  unique-opened theme="dark" :default-active="$route.path" :collapse="isCollapse" :default-openeds="openeds" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" >
      <div class="logo" :class="isCollapse?'ace-img':''"> <i class="fa fa-th"></i>{{isCollapse?'':sysName}} </div>
      <sidebar-item></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    data () {
        return {
          sysName:'行为分析',
          openeds: []
        }
    },
    created() {
      
    },
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    height:46px;
    font-size: 22px;
    padding-left:5px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
    background: #50314f;
    color:#fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
    border-right: solid 1px rgb(80, 49, 79);
  
    line-height: 46px;
    border-bottom: none;
    
  }

  .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .log .txt {
    color:#fff;
  }

  .logo-width{
    width:200px !important;
  }
  .logo-collapse-width{
    width:64px !important;
  }

  .logo i {
    width: 46px;
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
</style>