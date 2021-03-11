<template>

	<section class="app-main" style="min-height: 100%">
		<transition name="fade" mode="out-in">
			<router-view :key="key"></router-view>
		</transition>
	</section>
</template>

<script>
	export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #ribbon {
    overflow: hidden;
    padding: 15px 15px 0 20px;
    position: relative;
  }

  #ribbon .breadcrumb {
    display: inline-block;
    margin: 0;
    padding: 0;
    background: none;
    vertical-align: top;
  }

  .breadcrumb {
      padding: 8px 15px;
      margin-bottom: 17px;
      list-style: none;
      background-color: #f5f5f5;
      border-radius: 3px;
  }

</style>
