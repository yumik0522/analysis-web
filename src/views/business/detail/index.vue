<template>
<el-container class="content">
  <el-header>
   	<el-col :span="24" class="line">
		<el-row>
		  <el-col :span="2" style="width:auto;"><strong class="title" style="color: #21b799;cursor: pointer;width:auto;padding:0 10px;">仪表盘</strong>/
		  </el-col>
		  <el-col :span="17">
		  	<span class="title" style="width:auto;padding:0 30px 0 10px;">沙盘名：{{projectName}}</span>
		  	
		  	<span class="title" style="width:auto;padding:0 30px;">渠道：{{channel}}</span>
		  	
		  	<span class="title" style="width:auto;padding:0 30px;">时间区间：{{period}}</span>
		  	
		  </el-col>
		</el-row>
	</el-col>
   </el-header>
   <el-main style="background: #8f8f8f;" id="mydetail">
   		<el-row>
		  <el-col :span="24">
		  	<el-container style="background:#fff;">
		  		 
		  		<el-header>
		  			<div style="padding: 8px 16px;background-color: #e2e2e0;height:3em;">
		  				<button class="layui-btn  layui-btn-primary" :class="tabs==11?'site-tabs-active':''" @click.prevent="changeTabs(11)">沙盘摘要</button>
		  				<button class="layui-btn  layui-btn-primary" :class="tabs==22?'site-tabs-active':''" @click.prevent="changeTabs(22)">商品家族分析</button>
		  				<button class="layui-btn  layui-btn-primary" :class="tabs==33?'site-tabs-active':''" @click.prevent="changeTabs(33)">主题分析</button>
		  				<button class="layui-btn  layui-btn-primary" :class="tabs==44?'site-tabs-active':''" @click.prevent="changeTabs(44)">市场细分</button>
		  			</div>
		  		</el-header>
		  		<!--
		  		<el-main>
		  			<transition name="fade" mode="out-in">
						<router-view ref="content" @startJQueue="checkJQueue"></router-view>
					</transition>
		  		</el-main>
		  		-->
		  		<el-main v-show="activeName=='first'">
				  	<router-view  ref="ybp" @startJQueue="checkJQueue"></router-view>
		  		</el-main>
		  		<el-main v-show="activeName=='second'">
				  	<router-view  name="family_detail" ref="family" @themeList="themeList"  @startJQueue="checkJQueue"></router-view>
		  		</el-main>
		  		<el-main v-show="activeName=='third'">
				  	<router-view :layid="tabs" name="theme_detail"  ref="theme" @startJQueue="checkJQueue"></router-view>
		  		</el-main>
		  		<el-main v-show="activeName=='fourth'">
				  	<router-view  name="segment_detail"  ref="segment" @startJQueue="checkJQueue"></router-view>
		  		</el-main>
		  	</el-container>
		  </el-col>
		</el-row>
   </el-main>
</el-container>
</template>

<script>
import {
  getObj
} from 'api/business/project/index';
import { mapGetters } from 'vuex';
export default {
  name: 'detail',
  data() {
    return {
	  tabs:11,
	  projectId:0,
	  datasetKey:0,
	  projectName:'',
	  period:'',
	  channel:'全部',
	  activeName:'first',
    }
  },
  created(){
	if(this.$route.query) {
		this.tabs = this.$route.query.layid;
		this.projectId = this.$route.query.projectId;
		this.datasetKey = this.$route.query.datasetKey;
	}
	this.dataForm();
	this.changeTabs(this.tabs);
	
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    changeTabs(tabs) {
		this.tabs = tabs;
		if(this.tabs==11) {
			this.activeName='first';
			this.$refs.ybp.init();
		} else if(this.tabs==22){
			this.activeName='second';
			this.$refs.family.init();
		} else if(this.tabs==33){
			this.activeName='third';
			// this.$refs.theme.init();
		} else if(this.tabs==44){
			this.activeName='fourth';
			this.$refs.segment.init();
		}
	},
	dataForm() {
		let params = {datasetKey:this.datasetKey,projectId:this.projectId};
		getObj(params).then( res=> {
			this.projectName = res.data["Project"];
			this.period = res.data["Period"];
		});
	},
	checkJQueue(){
		this.$emit('startJQueue');
	},themeList(){
		this.$refs.theme.list();
	}
	
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>