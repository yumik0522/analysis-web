<template>
  <el-container>
    <el-header>
      <el-row :gutter="60" >
        <el-col :span="6">
          <el-table
          ref="savedSolutionsTable"
          :data="savedSolutionsData"
          @cell-click="getSavedSolutionsClick"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          height="142"
          >
          <el-table-column
            prop="analysis_name"
            :show-overflow-tooltip="true"
            label="已保存的主题方案" >
          </el-table-column>
        </el-table>
        </el-col>
        </el-row>	
    </el-header>
    <el-main style="overflow:hidden;padding: 10px 0;">
      <el-row :gutter="60"  >
        <el-col :span="6">
          <el-table
          ref="purchaseThemesTable"
          :data="purchaseThemesData"
          @selection-change="changeFun"
          select-on-indeterminate
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          height="300"
          >
            <el-table-column type="selection" width="45">
          </el-table-column>
          <el-table-column
            prop="factor_name"
            :show-overflow-tooltip="true"
            label="主题" >
          </el-table-column>
        </el-table>
        </el-col>
        <el-col :span="18">
          <el-form size="mini" label-width="140px" style="margin-top:1em;" :inline="true">
        <el-form-item label="最少“Hier1”数：">
          <el-select v-model="minCluster" placeholder="请选择" style="width:100px;">
            <el-option label="无限制" value="0"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-popover placement="right-end" :value="deptVisible&&targetActive=='third'&&layid==33" trigger="manual" >
              <el-table :data="deptDistributionData">
                <el-table-column  property="stats" label="统计"></el-table-column>
                <el-table-column  property="num_cust" label="消费者数"></el-table-column>
                <el-table-column  property="cust_spend" label="占比">
                  <template scope="scope">
                  {{Math.round(scope.row.cust_spend*100*100)/100+'%'}}
                  </template>
                </el-table-column>
                <el-table-column  property="spend" label="增量">
                <template scope="scope">
                  {{Math.round(scope.row.spend*100*100)/100+'%'}}
                  </template>
                </el-table-column>
            </el-table>
        <el-button slot="reference" @click="deptVisible=!deptVisible"  :disabled="analysisKey==0" type="primary" >按层级数查看数据分布</el-button>
        </el-popover>
        </el-form-item>
      </el-form>
      <el-form size="mini" label-width="140px" style="margin-top:1em;" :inline="true">
        <el-form-item label="  最少“家族”数：">
          <el-select v-model="minDept" placeholder="请选择" style="width:100px;">
            <el-option label="无限制" value="0"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-popover placement="right-start"  :value="clusterVisible&&targetActive=='third'&&layid==33" trigger="manual">
              <el-table :data="clusterDistributionData">
                <el-table-column  property="stats" label="统计"></el-table-column>
                <el-table-column  property="num_cust" label="消费者数"></el-table-column>
                <el-table-column  property="cust_spend" label="占比">
                  <template scope="scope">
                  {{Math.round(scope.row.cust_spend*100*100)/100+'%'}}
                  </template>
                </el-table-column>
                <el-table-column  property="spend" label="增量">
                <template scope="scope">
                  {{Math.round(scope.row.spend*100*100)/100+'%'}}
                  </template>
                </el-table-column>
            </el-table>
        <el-button slot="reference" @click="clusterVisible=!clusterVisible" :disabled="analysisKey==0" type="primary" >按家族数查看数据分布</el-button>
        </el-popover>
        </el-form-item>
      </el-form>
      <el-form size="mini" label-width="140px" style="margin-top:1em;" :inline="true">
        <el-form-item label="市场细分区间：">
            <el-input-number v-model="minSeg" controls-position="right" :min="2" :max="30" style="width:100px;"></el-input-number>
            一
            <el-input-number v-model="maxSeg" controls-position="right" :min="2" :max="30"  style="width:100px;"></el-input-number>
        </el-form-item>
      </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-form size="mini" style="margin-top:1em;float:right;margin-right:17%;" :inline="true">
        <el-form-item>
        <el-button type="primary" :disabled="selectedFactors===''" @click.prevent="runCustomerProfile">1.初始化</el-button>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" :disabled="selectedFactors===''" @click.prevent="runSegmentationJob">2.计算市场细分</el-button>
        </el-form-item>
      </el-form>
    </el-footer>
  </el-container>
</template>

<script>
import {
  getSavedSolutions,
  getPurchaseThemes,
  getDeptDistribution,
  getClusterDistribution
} from "api/business/theme/index";
import { mapGetters } from "vuex";
export default {
  name: "segmentation",
  props: ['targetActive'],
  data() {
    return {
      initVisible:false,
      activeName:'second',
      savedSolutionsData:[],
      clusterDistributionData:[],
      deptDistributionData:[],
      purchaseThemesData:[],
      parentKey:0,
      numFactor:0,
      minCluster:'0',
      minDept:'0',
      minSeg:2,
      maxSeg:30,
      solutionKey:0,
      selectedFactors:'',
      solutionName:'',
      themeName:'',
      analysisKey:0,
      clusterVisible:false,
      deptVisible:false
    };
  },
  created() {
    if (this.$route.query) {
      this.projectId = this.$route.query.projectId;
      this.datasetKey = this.$route.query.datasetKey;
      this.layid = this.$route.query.layid;
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
        this.GetSavedSolutions();
        this.initVisible = true;
      }
    },
    GetSavedSolutions() {
      let params = {datasetKey:this.datasetKey,projectId:this.projectId};
      getSavedSolutions(params).then(res=>{
        this.savedSolutionsData = res.data.list;
      });
    },
    getSavedSolutionsClick(item) {
      this.parentKey = item.fact_corr_key;
      this.numFactor = item.num_factor;
      this.solutionName = item.solution_name;
      this.themeName = item.theme_name;
      this.analysisKey = item.fact_corr_key;
      this.solutionKey = item.analysis_key;
      this.minSeg = item.min_num_seg;
      this.maxSeg = item.max_num_seg;
      this.selectedFactors = '';
      this.GetPurchaseThemes();
      this.GetClusterDistribution();
      this.GetDeptDistribution();
    },
    GetPurchaseThemes(){
      let target = this;
      let params = {datasetKey:this.datasetKey,projectId:this.projectId,parentKey:this.parentKey,numFactor:this.numFactor};
      getPurchaseThemes(params).then(res=>{
        this.purchaseThemesData = res.data.list;
        this.$refs.purchaseThemesTable.toggleAllSelection();
      });
    },  	
    GetClusterDistribution(){
      let target = this;
      let params= {datasetKey:this.datasetKey,projectId:this.projectId,analysisKey:this.analysisKey};
      getClusterDistribution(params).then(res=>{
        this.clusterDistributionData = res.data.list;
      });
    },
    GetDeptDistribution(){
      let target = this;
      let params= {datasetKey:this.datasetKey,projectId:this.projectId,analysisKey:this.analysisKey};
      getDeptDistribution(params).then(res=>{
        this.deptDistributionData = res.data.list;
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    changeFun(val){
      let selectedFactors = '';
      for(let i =0;i<val.length;i++) {
        selectedFactors+=val[i].factor_ind+",";
      }
      if(selectedFactors.length>0) {
          selectedFactors=selectedFactors.substr(0,selectedFactors.length-1);
        }
      this.selectedFactors = selectedFactors;
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>