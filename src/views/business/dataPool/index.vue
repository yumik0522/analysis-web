<template>
<div style="background:#f2f2f2;box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);">
	<el-col :span="24"  style="background:#f2f2f2;">
		<el-row class="line" style="margin-bottom: 7.5px;">
		  <el-col :span="17"><strong class="title">数据池与子集管理</strong></el-col>
		  
		  <el-col :span="6">
			  <el-input placeholder="搜索..." v-model="dbname"  class="input-with-select" >
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
					<el-button @click.prevent="newDatapool" type="primary" style="height: 30px; line-height: 30px;background-color: #009688; border-color: #009688;border-radius:2px;padding:0 18px;">新建数据池</el-button>
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
	<el-col :span="24" style="padding: 10px 15px 20px 15px;background:#fff;">
		<el-table
		    :data="list"
		    @row-click="datapoolListClick"
		    border
		    style="width: 100%;">
		    <el-table-column
		      prop="db_name"
		      label="数据池名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="tran_period"
		      label="时间区间"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="period_length"
		      label="时间跨度">
		    </el-table-column>
		    <el-table-column
		      prop="total_spend"
		      label="销售额">
		    </el-table-column>
		    <el-table-column
		      prop="total_quantity"
		      label="商品数量">
		    </el-table-column>
		    <el-table-column
		      prop="total_cust"
		      label="消费者数量">
		    </el-table-column>
		    <el-table-column
		      prop="total_tran"
		      label="交易数量">
		    </el-table-column>
		    <el-table-column
		      prop="total_proj"
		      label="子集数">
		    </el-table-column>
		  </el-table>
	</el-col>
	
	<el-dialog title="新建数据池" :visible.sync="newDatapoolVisible" width="60%">
	  <el-table :data="list" border height="150px">
	    <el-table-column label="选择" width="55">
	     <template slot-scope="scope">
            <el-radio :label="scope.row.dataset_sys_key" v-model="form.datasetKey" @change.native="getDatasetKey(scope.$index,scope.row)">&nbsp</el-radio>
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
	  
	<span slot="footer" class="dialog-footer">
		
	    <el-button @click="newDatapoolVisible = false">取 消</el-button>
	    <el-button type="primary" >保存</el-button>
	 </span>
	</el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/business/dataPool/index';
import { mapGetters } from 'vuex';
export default {
  name: 'dataPool',
  data() {
    return {
      list: [],
      dbname:"",
      total: null,
      newDatapoolVisible:false,
      listLoading:false,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
    }
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
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
    datapoolListClick(item){
      let params = {datasetKey:item.dataset_sys_key};
      this.$router.push({path:'/project/list',query:params})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>