<template>
<div style="background:#f2f2f2;box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);">
	<el-col :span="24" class="line" style="margin-bottom: 7.5px;">
		<el-row>
		  <el-col :span="17"><strong class="title">仪表盘管理</strong></el-col>
		  
		  <el-col :span="6">
			  <el-input placeholder="搜索..." v-model="projectName" class="input-with-select" >
			  </el-input>
		  </el-col>
		  <el-col :span="1">
		  	<i class="fa fa-search-plus" @click.prevent="search"></i>
		  </el-col>
		</el-row>
	</el-col>
	<el-col :span="24" style="background:#fff;">
		<el-col :span="18" >
		<div class="layui-card-header">
			<el-button @click.prevent="handleCreate" type="primary" style="height: 30px; line-height: 30px;background-color: #009688; border-color: #009688;border-radius:2px;padding:0 18px;">新建沙盘</el-button>
		</div>
		</el-col>
		<el-col :span="6">
			<div class="block">
				<span class="demonstration">{{(listQuery.page-1)*listQuery.limit+1}}-{{(listQuery.limit*listQuery.page)>total?total:(listQuery.limit*listQuery.page)}}/{{total}}</span>
				<el-pagination
					:page-size="listQuery.limit"
					:current-page="listQuery.page"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					layout="prev,next"
					:total="total">
				</el-pagination>
			</div>
		</el-col>
	
	</el-col>
	<el-col :span="24" style="padding: 10px 15px;background:#fff;">
		<el-row :gutter="20" >
		  <el-col :span="8" :key="index"  v-for = "(item,index) in list">
		  	<div class="grid-content bg-purple">
		  		<el-container style="cursor:pointer;">
				  <el-aside style="height:14em;padding:2px;width:33.3%">
				  	<div @click.prevent="detail(item,11)" style="background:#dee180;height:100%;">
				  		<el-row type="flex" align="middle" class="row-bg" style="height:calc(14em - 4px);text-align: center;">
						  <el-col :span="24"><b>沙盘：</b><br/>{{item.project_name}}<br/><br/><b>数据源：</b><br/>{{item.db_name}}</el-col>
						</el-row>
				  	</div>
				  </el-aside>
				  <el-container style="width:33.3%">
				    <el-header style="height:7em;padding:2px;width:100%">
				    	<div @click.prevent="detail(item,22)" style="background:#21b799;height:100%;">
				    		<el-row type="flex" align="middle" class="row-bg" style="height:calc(7em - 2px);text-align: center;overflow:hidden;">
							  <el-col :span="24" style="color:#fff;"><b>商品家族组合：</b><br/><div style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;" :key="index" v-for = "(family,index) in item.familys"><span v-show="index<3">{{family.solution_name}}</span><span v-show="index===3">...</span></div></el-col>
							</el-row>
				    	</div>
				    </el-header>
				    <el-main style="height:7em;padding:2px;width:100%">
				    	<div @click.prevent="detail(item,33)" style="background:#21b799;height:100%;">
				    		<el-row type="flex" align="middle" class="row-bg" style="height:calc(7em - 2px);text-align: center;overflow:hidden;">
							  <el-col :span="24" style="color:#fff;"><b>主题方案：</b><br/><div style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;" :key="index" v-for = "(analysis,index) in item.themes"><span v-show="index<3">{{analysis.analysis_name}}</span><span v-show="index===3">...</span></div></el-col>
							</el-row>
				    	</div>
				    </el-main>
				  </el-container>
				  <el-container style="width:33.3%">
				    <el-main style="height:14em;padding:2px;width:100%;">
				    	<div @click.prevent="detail(item,44)" style="background:#ece9c2;height:100%;">
				    		<el-row type="flex" align="middle" class="row-bg" style="height:calc(14em - 4px);text-align: center;overflow:hidden;padding:10px;">
							  <el-col :span="24" ><b>市场细分：</b><br/><div style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;" :key="index" v-for = "(segment,index) in item.segments"><span v-show="index<4">{{segment.segmentation}}</span><span v-show="index===4">...</span></div></el-col>
							</el-row>
				    	</div>
				    </el-main>
				  </el-container>
				  
				</el-container>
		  	</div>
		  </el-col>
		</el-row>
	</el-col>
	
	<el-dialog title="新建沙盘" :visible.sync="dialogFormVisible" width="60%">
	  <el-table :data="dataPoolData" border height="150px">
	    <el-table-column label="选择" width="55">
	     <template slot-scope="scope">
            <el-radio :label="scope.row.dataset_sys_key" v-model="form.datasetKey" @change.native="selDatasetKey(scope.$index,scope.row)">&nbsp</el-radio>
        </template>
	    </el-table-column>
	    <el-table-column property="db_name" :show-overflow-tooltip="true" label="数据池名称" width="150"></el-table-column>
	    <el-table-column property="tran_period" :show-overflow-tooltip="true" label="时间区间"></el-table-column>
	    <el-table-column property="period_length" :show-overflow-tooltip="true" label="时间跨度"></el-table-column>
	    <el-table-column property="total_spend" :show-overflow-tooltip="true" label="销售额"></el-table-column>
	    <el-table-column property="total_quantity" :show-overflow-tooltip="true" label="商品数量"></el-table-column>
	    <el-table-column property="total_cust" :show-overflow-tooltip="true" label="消费者数量" width="120"></el-table-column>
	    <el-table-column property="total_tran" :show-overflow-tooltip="true" label="交易数"></el-table-column>
	    <el-table-column property="total_proj" label="子集数"></el-table-column>
	  </el-table>
	  <el-form label-width="180px" size="mini" style="margin-top:1em;">
	  <el-form-item label="沙盘名称" >
	    <el-input v-model="form.projectName" style="width: 350px;" ></el-input>
	  </el-form-item>
	  <el-form-item label="沙盘描述" >
	      <el-input v-model="form.description" style="width: 350px;" type="textarea" placeholder="请选择沙盘描述" ></el-input>
	  </el-form-item>
	  <el-form-item  label="时间区间">
	     <el-date-picker
	      v-model="form.datetime"
	      type="daterange"
	      align="left"
	      unlink-panels
	      range-separator="至"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
	      :picker-options="form.pickerOptions">
	    </el-date-picker>
	  </el-form-item>
	  <el-form-item  label="销售渠道">
	    <el-select style="width: 350px;" v-model="form.type" placeholder="请选择销售渠道">
	      <el-option label="全部" value="#ALL"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item  label="消费者">
	    <el-select style="width: 350px;" v-model="form.customer" placeholder="请选择消费者">
	      <el-option label="全部" value="ALL"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item  label="商品层级">
	    <el-select style="width: 350px;" v-model="form.goods" placeholder="请选择商品层级">
	      <el-option label="层级1" value="L1"></el-option>
	      <el-option label="层级2" value="L2"></el-option>
	    </el-select>
	  </el-form-item>
	</el-form>
	<span slot="footer" class="dialog-footer">
		
	    <el-button @click="newProjectVisible = false">取 消</el-button>
	    <el-button type="primary" @click="create()">新建“主题”沙盘</el-button>
	 </span>
	</el-dialog>
</div>
</template>

<script>
import {
  addObj,
  page
} from 'api/business/project/index';
import {
  page as getDataPoolList
} from 'api/business/dataPool/index';
import { mapGetters } from 'vuex';
export default {
  name: 'project',
  data() {
    return {
	  list: [],
	  datasetKey:0,
      projectName:"",
	  total: null,
	  dataPoolData:[],
	  dialogFormVisible:false,
	  listLoading:false,
	  startDate:'',
      endDate:'',
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
	  },
	  form:{
		datasetKey:'',
		projectName:"",
		description:"",
		customer:'ALL',
		period:'',
		datetime:'',
		goods:'L1',
		type:'#ALL',
		pickerOptions:{}
	  }
    }
  },
  created() {
    
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  mounted:function(){
	if(this.$route.query) {
		// this.tabs = this.$route.query.layid;
		this.datasetKey = this.$route.query.datasetKey;
		this.listQuery.datasetKey = this.datasetKey;
	}
	this.getList();
 },
  methods: {
	init(){
		if(!this.initVisible) {
			// this.dataForm();
			this.getList();
			this.initVisible = true;
		}
	},
    getList() {
      this.listLoading = true;
      page(this.listQuery)
        .then(res => {
          this.list = res.data.records;
          this.total = res.data.total;
		  this.listLoading = false;
        })
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
	handleCreate() {
      this.dialogStatus = 'create';
	  this.dialogFormVisible = true;
	  this.getDataPool();
	},
	getDataPool() { // 获取数据池列表
		let params = {};

		getDataPoolList(params).then(res => {
			this.dataPoolData = res.data.records;
			this.form.datasetKey = this.dataPoolData[0].dataset_sys_key;

			let date = this.dataPoolData[0].tran_period.split("-");
			this.form.datetime = date;
			this.startDate = this.$moment(date[0]).format("YYYY-MM-DD");
			this.endDate = this.$moment(date[1]).format("YYYY-MM-DD");
		});
	},
	selDatasetKey(index,row) { // 选择数据池
		this.form.datasetKey = row.dataset_sys_key;
		let date = this.dataPoolData[index].tran_period.split("-");
		this.form.datetime = date;
		this.startDate = this.$moment(date[0]).format("YYYY-MM-DD");
		this.endDate = this.$moment(date[1]).format("YYYY-MM-DD");
	},
	create() {
      if(!(this.form.period&&this.form.period.indexOf("#")>-1)) {
		const startDate = this.$moment(this.form.datetime[0]).format("DD MMM YYYY");
		const endDate = this.$moment(this.form.datetime[1]).format("DD MMM YYYY");
		this.form.period = startDate+"-"+endDate;
	  }
	  this.form.period = "#52 weeks";
	  const params = {projName:this.form.projectName,projDesc:this.form.description,period:this.form.period,type:this.form.type,customer:this.form.customer,goodsLevel:this.form.goods,datasetKey:this.form.datasetKey};
	  addObj(params).then(res => {
		if(res.code==2000000) {
			// this.$emit('startJQueue');
			this.dialogFormVisible = false;
			this.$message({
				type: 'success',
				message:"正在新建沙盘，请稍等...!"
			});
		} else {
			this.$message({
				type: 'error',
				message:res.msg
			});
		}
	  });
	},
	detail(item,layid) {
		this.$router.push({
			path:'/content',
			query: {
				layid: layid,
				projectId:item.projectId,
				datasetKey:item.dataset_sys_key
			}
		});
	}
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>