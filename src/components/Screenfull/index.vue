<template>
  <i @click='click' class="wk-icon screenfull " :class="isFullscreen?'icon-screen-restore':'icon-screen-full'" ></i>
</template>

<script>
  import screenfull from 'screenfull';
  export default {
    name: 'hamburger',
    props: {
      
    },
    data() {
      return {
        isFullscreen: false
      }
    },
    mounted() {
      let _that=this;
      window.onresize = function() {
        if (!_that.checkFull()) {
            //要执行的动作
           _that.isFullscreen=false;
        } else {
          _that.isFullscreen=true;
        }
      }
    },
    methods: {
      checkFull() {
        let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if (isFull === undefined) {isFull = false;}
        return isFull
      } ,
      click() {
        
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false;
        }
        screenfull.toggle();
       
      }
    }
  }
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  vertical-align: -0.15em;
}
</style>
