<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" to="/" key="dashboard">
      <el-tag :class="isActive('/dashboard')?'active':''">
        <i class="wk-icon icon-dashboard"></i><span style="margin-left: 5px;padding-right: 20px;">控制台</span>
      </el-tag>
    </router-link>
    <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag v-if="tag.path!='/'" :closable="true" :type="isActive(tag.path)?'primary':''" :class="isActive(tag.path)?'active':''" @close='closeViewTabs(tag,$event)'>
        <i :class="tag.icon"></i><span style="margin-left: 5px;">{{tag.name}}</span>
      </el-tag>
    </router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      visitedViews() {
        return this.$store.state.app.visitedViews.slice(-6)
      }
    },
    methods: {
      closeViewTabs(view, $event) {
        this.$store.dispatch('delVisitedViews', view)
        $event.preventDefault()
      },
      generateRoute() {
        if (this.$route.matched[this.$route.matched.length - 1].name) {
          return this.$route.matched[this.$route.matched.length - 1]
        }
        this.$route.matched[0].path = '/'
        return this.$route.matched[0]
      },
      addViewTabs() {
        this.$store.dispatch('addVisitedViews', this.generateRoute())
      },
      isActive(path) {
        return path === this.$route.path
      }
    },
    watch: {
      $route() {
        this.addViewTabs()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .tabs-view {
      margin-left: 10px;
    }
  }
</style>
