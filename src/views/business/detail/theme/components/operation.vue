<template>
  <div>
    <el-form size="mini">
      <el-form-item>
        <el-input v-model="keyword" placeholder="请输入过滤条件"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="list" border @selection-change="changeFun" highlight-current-row height="350">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="solution_name" label="商品组合"></el-table-column>
      <el-table-column prop="dept_code" label="Hier1"></el-table-column>
      <el-table-column prop="num_group" label="商品家族数"></el-table-column>
      <el-table-column prop="num_prod" label="商品总数"></el-table-column>
    </el-table>
    <el-form size="mini" style="margin-top:1em;" :inline="true">
      <el-form-item>
        <el-button type="primary" @click.prevent="handleDistribution">查看消费能力分布</el-button>
      </el-form-item>
      <el-form-item label="剔除消费金额小于">
        <el-input-number v-model="minSpend" controls-position="right" placeholder="请输入..."></el-input-number>
      </el-form-item>
      <el-form-item label="剔除消费金额大于">
        <el-input-number v-model="maxSpend" controls-position="right" placeholder="请输入..."></el-input-number>
      </el-form-item>
      <el-form-item style="margin-left:2em;">
        <el-input v-model="analysisName" placeholder="主题分析名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleRunFactorAnalysis"
          :disabled="multipleSelection.length==0"
          type="primary"
        >运算主题分析</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="查看消费者数量分布" :visible.sync="distribution.visible" width="900px">
		  <el-table :data="distribution.list" border height="310px">
		    <el-table-column type="index" width="55">
		    </el-table-column>
		    <el-table-column property="perc_desc" :show-overflow-tooltip="true" label="十等分"></el-table-column>
		    <el-table-column property="num_cust" :show-overflow-tooltip="true" label="消费者数"></el-table-column>
		    <el-table-column property="min_stats" :show-overflow-tooltip="true" label="最小消费者数"></el-table-column>
		    <el-table-column property="max_stats" :show-overflow-tooltip="true" label="最大消费者数"></el-table-column>
		    <el-table-column property="perc_spend" :show-overflow-tooltip="true" label="销售占比"></el-table-column>
		  </el-table>
		 <span slot="footer" class="dialog-footer">
		 </span>
		</el-dialog>
  </div>
</template>

<script>
import {
  getOperationList,
  runFactorAnalysis,
  getDistributionList
} from "api/business/theme/index";
import { mapGetters } from "vuex";
export default {
  name: "operation",
  data() {
    return {
      keyword: "",
      list: [],
      minSpend: 0,
      maxSpend: 1000000,
      analysisName: "",
      multipleSelection: [],
      distribution:{
        visible:false,
        list:[]
      },
      initVisible: false
    };
  },
  created() {
    if (this.$route.query) {
      this.projectId = this.$route.query.projectId;
      this.datasetKey = this.$route.query.datasetKey;
      if (this.$route.query.layid == 33) {
        this.init();
      }
    }
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    init() {
      if (!this.initVisible) {
        this.getOperationData();
        this.initVisible = true;
      }
    },
    getOperationData() {
      // 主题运算列表
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      getOperationList(params).then(res => {
        this.list = res.data.list;
      });
    },
    handleDistribution() {
      //查看消费者数量分布
      this.distribution.visible = true;
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      getDistributionList(params).then(res => {
        this.distribution.list = res.data.list;
      });
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    handleRunFactorAnalysis() {
      let target = this;
      let keys = "",
        codes = "",
        groups = "";
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let obj = this.multipleSelection[i];
        keys += obj.dept_key + ",";
        codes += obj.dept_code + ",";
        groups += obj.solution_key + ",";
      }
      if (keys.length > 0) {
        keys = keys.substr(0, keys.length - 1);
      }
      if (codes.length > 0) {
        codes = codes.substr(0, codes.length - 1);
      }
      if (groups.length > 0) {
        groups = groups.substr(0, groups.length - 1);
      }
      let param = "";

      if (keys != "") {
        param = {
          keys: keys,
          codes: codes,
          groups: groups
        };
        param = JSON.stringify(param);
      }
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        analysisName: this.analysisName,
        minSpend: this.minSpend,
        maxSpend: this.maxSpend,
        params: param
      };
      runFactorAnalysis(params).then(res => {
        if (res.code == 2000000) {
          this.$emit("startJQueue");
          this.$message({
            type: "success",
            message: res.data
          });
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    handleDistribution() {//查看消费者数量分布
      this.distribution.visible = true;
      let params = {datasetKey:this.datasetKey,projectId:this.projectId};
      getDistributionList(params).then( res=>{
          this.distribution.list = res.data.list;
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>