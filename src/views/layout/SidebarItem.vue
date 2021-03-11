<template>
	<div class='menu-wrapper'>
	
	<template v-for="item in routes">
		<!-- <router-link v-if="item.children.length>0" :to="item.code+'/'+item.children[0].code">
			<el-menu-item :index="item.code+'/'+item.children[0].code" class='submenu-title-noDropdown'>
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].title}}</span>
			</el-menu-item>
		</router-link> -->
		<el-submenu  :index="item.title" :key="item.name" :class="item.children&&item.children.length>0?'':'wg-menu-item'+(isActive('/dashboard')?' is-active':'')" >
			<template slot="title" v-if='item.children&&item.children.length>0'>
				<!-- <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg> -->
				<i v-if='item.icon' :class="item.icon"></i>
				<span>{{item.title}}</span>
			</template>
			<template slot="title" v-else>
				<router-link v-if="item.href!=null&&item.href.indexOf('http')!=0&&item.type!='dirt'"  :to="'/'+item.code" :key="item.name">
					<div style="width:100%;">
						<i style="margin-right: 10px;" v-if='item.icon' :class="item.icon"></i>
						<span>{{item.title}}</span>
					</div>
				</router-link>
			</template>
			<template v-for="child in item.children">
				<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child.name"> </sidebar-item>
				<a target="_blank"  v-if="child.href!=null&&child.href.indexOf('http')==0" :href="child.href" :key="child.name">
					<el-menu-item :index="'/'+item.code+'/'+child.code">
						<!-- <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg> -->
						<i v-if='item.icon' :class="child.icon"></i>
						<span>{{child.title}}</span>
					</el-menu-item>
				</a>
				<router-link v-if="child.href!=null&&child.href.indexOf('http')!=0&&child.type!='dirt'"  :to="'/'+item.code+'/'+child.code" :key="child.name">
					<el-menu-item :index="'/'+item.code+'/'+child.code">
						<!-- <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg> -->
						<i v-if='item.icon' :class="child.icon"></i>
						<span>{{child.title}}</span>
					</el-menu-item>
				</router-link>
			</template>
		</el-submenu>

	</template>

	</div>
</template>

<script>
  export default {
	name: 'SidebarItem',
	data() {
	   return {
		   routes: [{
			"id" : 14,
			"parentId" : -1,
			"children" : [ ],
			"icon" : "fa fa-database fa-fw",
			"name" : "数据池",
			"title" : "数据池",
			"href" : "dataPool/list",
			"spread" : false,
			"code" : "dataPool/list",
			"enabled" : "1",
			"description" : null
			}, {
			"id" : 15,
			"parentId" : -1,
			"children" : [ ],
			"icon" : "fa fa-line-chart fa-fw",
			"name" : "仪表盘",
			"title" : "仪表盘",
			"href" : "project/list",
			"spread" : false,
			"code" : "project/list",
			"enabled" : "1",
			"description" : null
			}]
	   }
	   
	},
	methods: {
      isActive(path) {
        return path === this.$route.path
      }
    },
  }
</script>