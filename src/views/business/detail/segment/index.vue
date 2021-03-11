<template>
<el-container class="content">
	<el-main style="padding:10px 50px;">
		<el-row :gutter="20">
			<el-form label-width="100px" size="mini">
				<el-col :span="6">
				<el-form-item label="数据池">
					<el-input v-model="project.dbname" :disabled="true"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="6">
				<el-form-item label="沙盘名称">
					<el-input v-model="project.projectName" :disabled="true"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="6">
				<el-form-item label="类型">
					<el-input v-model="project.type" :disabled="true"></el-input>
				</el-form-item>
				</el-col>
			 </el-form>
    	</el-row>
	    <el-row :gutter="20">
					<el-form label-width="100px" size="mini">
						<el-col :span="6">
	 				<el-form-item label="消费者类型">
	 					<el-input v-model="project.projectName" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
	 				<el-col :span="6">
	 				<el-form-item label="描述">
	 					<el-input v-model="project.description" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
	 				<el-col :span="6">
	 				<el-form-item label="消费者数量">
	 					<el-input v-model="project.customers" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
					 </el-form>
	     </el-row>
	     <el-row :gutter="20">
					<el-form label-width="100px" size="mini">
	 				<el-col :span="6">
	 				<el-form-item label="销售渠道">
	 					<el-input v-model="project.channel" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
	 				<el-col :span="6">
	 				<el-form-item label="销售额">
	 					<el-input v-model="project.sales" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
					 </el-form>
	    </el-row>
	    <el-row :gutter="20">
					<el-form label-width="100px" size="mini">
	 				<el-col :span="6">
	 				<el-form-item label="交易数">
	 					<el-input v-model="project.transactions" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
	 				<el-col :span="6">
	 				<el-form-item label="时间区间">
	 					<el-input v-model="project.period" :disabled="true"></el-input>
	 				</el-form-item>
	 				</el-col>
					 </el-form>
	    </el-row>
	    <el-col :span="24" style="padding: 10px 0px 10px 0px;">
			<el-table
			    :data="list"
			    border
			    style="width: 100%;">
			    <el-table-column  prop="prod_code" label="代码" :show-overflow-tooltip="true">
			    </el-table-column>
			    <el-table-column prop="prod_desc" label="Hier1" :show-overflow-tooltip="true">
			    </el-table-column>
			    <el-table-column prop="num_prod" label="在售数量" >
			    </el-table-column>
			    <el-table-column prop="total_cust" label="消费者数" >
			    </el-table-column>
			    <el-table-column prop="total_spend" label="销售额" >
			    </el-table-column>
			    <el-table-column prop="total_quantity" label="总体积" >
			    </el-table-column>
			    <el-table-column prop="created_summary" label="摘要" >
			    </el-table-column>
			    <el-table-column prop="created_matrix" label="Matrix" >
			    </el-table-column>
			  </el-table>
		</el-col>
		<el-col :span="18">
			<el-pagination
		      :page-sizes="[5, 10, 50, 100]"
		      :page-size="listQuery.limit"
              :current-page="listQuery.page"
              @size-change="handleSizeChange"
      		  @current-change="handleCurrentChange"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</el-col>
	</el-main>
	<el-footer>
	  	<el-row :gutter="20" style="margin-top:1em;width:100%;">
			<el-form label-width="200px" size="mini">
				<el-col :span="12">
					<el-button style="margin-left:50px;" type="danger" @click.prevent="handleDelete" >删除</el-button>
				</el-col>
			 </el-form>
			 <el-col :span="12">
			 	 <el-button type="primary" @click.prevent="handleGoodsList">查看商品</el-button>
			 </el-col>
    	</el-row>
	  </el-footer>
	  <el-dialog title="查看商品" :visible.sync="showGoodsVisible" width="1000px">
	    <el-form label-width="100px" :inline="true" size="mini" style="margin-top:1em;">
		  <el-form-item label="Hier1代码：" >
		    <el-input v-model="goods.parentCode" style="width:120px;" placeholder="Hier1代码" ></el-input>
		  </el-form-item>
		  <el-form-item label="Hier1描述：" >
		      <el-input v-model="goods.parentDesc" style="width:120px;"  placeholder="Hier1描述" ></el-input>
		  </el-form-item>
		  <el-form-item  label="品号：">
		    <el-input v-model="goods.prodCode" style="width:100px;"  placeholder="品号" ></el-input>
		  </el-form-item>
		  <el-form-item  label="品名：">
		    <el-input v-model="goods.prodDesc" style="width:100px;"  placeholder="品名" ></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="showGoods()">查询</el-button>
		  </el-form-item>
		</el-form>
		  <el-table :data="goods.list" @sort-change="sortChange" :default-sort = "{prop: 'total_cust', order: 'descending'}" border height="310px">
	    <el-table-column property="prod_code" :show-overflow-tooltip="true" label="商品码" width="100"></el-table-column>
	    <el-table-column property="prod_type" :show-overflow-tooltip="true" label="商品类型"></el-table-column>
	    <el-table-column property="prod_desc" :show-overflow-tooltip="true" label="描述"></el-table-column>
	    <el-table-column property="parent_code" :show-overflow-tooltip="true" label="Hier1代码"></el-table-column>
	    <el-table-column property="parent_type" :show-overflow-tooltip="true" label="Hier1类型"></el-table-column>
	    <el-table-column property="total_spend" :show-overflow-tooltip="true" sortable label="销售额" width="120"></el-table-column>
	    <el-table-column property="total_cust" :show-overflow-tooltip="true" sortable label="消费者数" width="120"></el-table-column>
	    <el-table-column property="total_quantity" :show-overflow-tooltip="true" label="价格" width="120"></el-table-column>
	  </el-table>
	
	 <span slot="footer" class="dialog-footer">
		<el-pagination
		      :page-sizes="[5, 10, 50, 100]"
		      :page-size="goods.pageSize"
              :current-page="goods.pageNo"
              @size-change="handleGoodsSizeChange"
      		  @current-change="handleGoodsCurrentChange"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="goods.total">
		    </el-pagination>
	 </span>
	</el-dialog>	  
</el-container>
</template>

<script>
import {
  delObj,
  getObj,
  getDeptList,
  getGoodsList
} from 'api/business/project/index';
import { mapGetters } from 'vuex';
export default {
  name: 'detail',
  data() {
    return {
	  projectId:0,
	  datasetKey:0,
	  list: [],
	  total:0,
	  showGoodsVisible:false,
	  sort:'s.total_cust desc',
	  listQuery: {
        page: 1,
        limit: 5,
        name: undefined
	  },
	  project: {
		"customers": '',
		"dbname": '',
		"description": '',
		"period": '',
		"product_matrix_customers": '',
		"product_matrix_sales": '',
		"projectName": '',
		"sales": '',
		"summarisedDate": '',
		"transactions":'',
		"type":'',
		"channel":'全部'
	  },
	  goods:{
		parentCode:'',
		parentDesc:'',
		prodCode:'',
		prodDesc:'',
		list:[],
		pageNo:1,
		total:0,
		pageSize:10
	  },
	  initVisible:false
    }
  },
  mounted(){
	if(this.$route.query) {
		this.projectId = this.$route.query.projectId;
		this.datasetKey = this.$route.query.datasetKey;
		if(this.$route.query.layid==11) {
			this.init();
		}
	}
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    init(){
		if(!this.initVisible) {
			this.handleDeatil();
			this.getList();
			this.initVisible = true;
		}
	},
	getList() {
		let params = {datasetKey:this.datasetKey,projectId:this.projectId,page:this.listQuery.page,limit:this.listQuery.limit};
		getDeptList(params).then( res => {
			this.list = res.data.records;
			this.total = res.data.total;
		});
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
	handleDeatil() {
		let params = {datasetKey:this.datasetKey,projectId:this.projectId};
		getObj(params).then( res=> {
			this.project.dbname = res.data["Db Name"];
			this.project.projectName = res.data["Project"];
			this.project.type = res.data["Type"];
			this.project.customers = res.data["Customers"];
			this.project.description = res.data["Description"];
			this.project.sales = res.data["Sales"];
			this.project.transactions = res.data["Transactions"].replace(/(^\s*)|(\s*$)/g, "");
			this.project.period = res.data["Period"];
		});
	},
	handleDelete(){
		let params = {datasetKey:this.datasetKey,projectId:this.projectId};
		this.$confirm('确定删除该沙盘?', '信息', {
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			type: 'warning',
			callback: action => {
				delObj(params).then( res => {
					if(res.code==2000000) {
						this.$router.push({path:'/project/list'})
						this.$message({
							type: 'success',
							message:res.data
						});
					} else {
						this.$message({
							type: 'error',
							message:res.msg
						});
					}
				});
			}
		});
	},
	sortChange(item) {
		this.sort = " s."+item.prop+" "+(item.order.replace("ending",""));
		// this.getGoodsList();
	},
	handleGoodsList() {
		this.showGoodsVisible = true;
		let params = {datasetKey:this.datasetKey,projectId:this.projectId,parentCode:this.goods.parentCode,parentDesc:this.goods.parentDesc,prodCode:this.goods.prodCode,prodDesc:this.goods.prodDesc,page:this.goods.pageNo,limit:this.goods.pageSize,sort:this.sort};
		getGoodsList(params).then( res => {
			this.goods.list = res.data.records;
			this.goods.total = res.data.total;
		});
	},
	handleGoodsSizeChange(val) {
		this.goods.pageSize = val;
		this.handleGoodsList();
	},handleGoodsCurrentChange(val) {
		this.goods.pageNo =val;
		this.handleGoodsList();
	},
	checkJQueue(){
		this.$emit('startJQueue');
	}
	
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>