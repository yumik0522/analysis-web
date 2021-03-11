<template>
	<div>
		<i @click="toggleClick" class="hamburger wk-icon" :class="isActive?'icon-shrink-right':'icon-spread-left'"></i>
	</div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>


</style>
