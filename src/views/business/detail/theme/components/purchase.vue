<template>
  <el-container>
    <el-header>
      <el-row :gutter="60">
        <el-col :span="6">
          <el-table
            ref="themeTable"
            :data="themeList"
            border
            highlight-current-row
            @cell-click="purchaseThemesClick"
            @current-change="handleThemeChange"
            height="142"
          >
            <el-table-column width="70">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFactorAnalysis(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="analysis_name" :show-overflow-tooltip="true" label="主题分析"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="3">
          <el-table
            ref="numFactorTable"
            :data="numFactorList"
            border
            highlight-current-row
            @row-click="numFactorClick"
            @current-change="handleThemeChange"
            height="142"
          >
            <el-table-column prop="num_factor" :show-overflow-tooltip="true" label="主题数"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="3">
          <el-table
            ref="rotationTable"
            :data="rotationList"
            border
            highlight-current-row
            @row-click="getRotationClick"
            @current-change="handleThemeChange"
            height="142"
          >
            <el-table-column prop="name" :show-overflow-tooltip="true" label="旋转"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6">
          <el-table
            ref="savedSolutionsTable"
            :data="savedSolutionList"
            @cell-click="getSavedSolutionsClick"
            border
            highlight-current-row
            @current-change="handleThemeChange"
            :row-class-name="getSavedSolutionsRow"
            height="142"
          >
            <el-table-column width="70">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelFactorSolution(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="analysis_name" :show-overflow-tooltip="true" label="已保存的主题方案"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="6" style="height:150px;line-height:40px;padding-top:40px;">
          <el-row>
            <el-button v-show="chartTable=='chart'" @click="chartTable='table'" type="primary">表格显示</el-button>
          </el-row>
          <el-row>
            <el-button v-show="chartTable=='table'" @click="chartTable='chart'" type="primary">图形显示</el-button>
          </el-row>
          <el-row>
            <el-button type="primary">导出数据</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main v-show="chartTable=='chart'" style="overflow:hidden;padding: 10px 0;">
      <el-row :gutter="30">
        <el-col :span="16">
          <highcharts :options="leftChart.options" :styles="leftChart.styles" ref="leftChart"></highcharts>
        </el-col>
        <el-col :span="8">
          <highcharts :options="rightChart.options" :styles="rightChart.styles" ref="rightChart"></highcharts>
        </el-col>
      </el-row>
    </el-main>
    <el-main v-show="chartTable=='table'" style="overflow:hidden;padding: 10px 0;">
      <el-table :data="factorResultList" border highlight-current-row height="350">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column prop="group_name" label="商品组合" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="dept_code" label="Hier1"></el-table-column>
        <!-- 自定义列的遍历  -->
        <el-table-column v-for="(item, index) in themeTheadNames" :key="index" :label="item">
          <template slot-slot-scope="scope">
            <span>{{scope.row["factor_"+(index+1)]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        :current-page="pageNo"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-main>
    <el-footer v-show="chartTable=='chart'">
      <el-form size="mini" style="margin-top:1em;float:right;margin-right:17%;" :inline="true">
        <el-form-item :label="'Theme '+factorInd+'：'">
          <el-input v-model="factorName" placeholder="主题名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="factorInd===''" @click.prevent="handleSaveFactorName">更新主题名</el-button>
        </el-form-item>
      </el-form>
    </el-footer>
    <el-dialog :title="sku.title" :visible.sync="sku.visible" width="900px">
      <el-table :data="sku.list" border height="310px">
        <el-table-column type="index" width="55">
        </el-table-column>
        <el-table-column property="prod_code" :show-overflow-tooltip="true" label="SKU"></el-table-column>
        <el-table-column property="prod_desc" :show-overflow-tooltip="true" label="品名"></el-table-column>
        <el-table-column property="total_spend" :show-overflow-tooltip="true" label="销售额"></el-table-column>
        <el-table-column property="total_cust" :show-overflow-tooltip="true" label="消费者数"></el-table-column>
        <el-table-column property="avg_price" :show-overflow-tooltip="true" label="价格"></el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  purchaseThemes,
  getNumFactorList,
  getFactorResult,
  getLoadFactorResult,
  getSaveSolutions,
  getFamilyList,
  deleteFactorSolution,
  deleteFactorAnalysis,
  saveFactorName
} from "api/business/theme/index";
import {
  getSkuList
} from "api/business/family/index";
import { mapGetters } from "vuex";
export default {
  name: "purchase",
  components: {
    highcharts: () => import("../../../../components/chart")
  },
  data() {
    return {
      themeList: [],
      rotationList: [],
      numFactorList: [],
      savedSolutionList: [],
      factorResultList: [],
      currentForm: {},
      unsaveForm: {
        numFactor: 3,
        analysisKey: 0,
        rotation: "PARSIMAX",
        includeGroups: "",
        title: "",
        index: 0
      },
      saveForm: {
        numFactor: 3,
        analysisKey: 0,
        rotation: "PARSIMAX",
        includeGroups: "",
        title: "",
        index: 0
      },
      currentRow: {},
      chartTable: "chart",
      initVisible: false,
      pageNo: 1,
      total: 0,
      pageSize: 10,
      factorInd: "",
      factorName: "",
      themeTheadNames: [],
      leftChart: {
        options: {},
        styles: {}
      },
      rightChart: {
        options: {},
        styles: {}
      },
      sku: {
        title:'',
        list:[],
        visible:false
      }
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
        this.getPurchaseThemesData();
        this.getSaveSolutionsData();
        this.initVisible = true;
      }
    },
    getPurchaseThemesData() {
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      purchaseThemes(params).then(res => {
        this.themeList = res.data.list;
        if (this.themeList.length > 0) {
          this.$refs.themeTable.setCurrentRow(this.themeList[0]);
          this.unsaveForm.analysisKey = this.themeList[0].analysis_key;
          this.unsaveForm.includeGroups = this.themeList[0].include_groups;
          this.getNumFactorData();
          this.rotationList = [{ name: "PARSIMAX" }, { name: "EQUAMAX" }];
        } else {
          //this.activeName="first";
        }
      });
    },
    getNumFactorData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        analysisKey: this.unsaveForm.analysisKey
      };

      getNumFactorList(params).then(res => {
        this.numFactorList = res.data.list;
        this.$refs.numFactorTable.setCurrentRow(this.numFactorList[0]);
        this.unsaveForm.numFactor = this.numFactorList[0].num_factor;
        this.$refs.rotationTable.setCurrentRow(this.rotationList[0]);
        this.unsaveForm.rotation = this.rotationList[0].name;
        this.unsaveForm.title =
          this.themeList[0].analysis_name +
          "-" +
          this.unsaveForm.numFactor +
          " 主题 " +
          this.unsaveForm.rotation +
          "（未保存）";
        this.loadFactorResult(this.unsaveForm);
      });
    },
    handleThemeChange(val) {
      this.currentRow = val;
    },
    numFactorClick(item) {
      this.unsaveForm.numFactor = item.num_factor;
      this.unsaveForm.title =
        this.themeList[0].analysis_name +
        "-" +
        this.unsaveForm.numFactor +
        " 主题 " +
        this.unsaveForm.rotation +
        "（未保存）";
      this.loadFactorResult(this.unsaveForm);
    },
    getSaveSolutionsData() {
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      getSaveSolutions(params).then(res => {
        this.savedSolutionList = res.data.list;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFactorResultData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getFactorResultData();
    },
    getFactorResultData() {
      let target = this;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        numFactor: this.currentForm.numFactor,
        analysisKey: this.currentForm.analysisKey,
        rotation: this.currentForm.rotation,
        includeGroups: this.currentForm.includeGroups,
        page: this.pageNo,
        limit: this.pageSize
      };
      // this.updateThemeTheadNames(this.currentForm.numFactor);
      getFactorResult(params).then(res => {
        this.factorResultList = res.data.dataList;
        this.total = res.data.total;
      });
    },
    purchaseThemesClick(item, column) {
      if (column.label === "主题分析") {
        this.unsaveForm.analysisKey = item.analysis_key;
        this.unsaveForm.includeGroups = item.include_groups;
        this.unsaveForm.title =
          item.analysis_name +
          "-" +
          this.unsaveForm.numFactor +
          " 主题 " +
          this.unsaveForm.rotation +
          "（未保存）";
        this.loadFactorResult(this.unsaveForm);
      }
    },
    getNumFactorClick(item) {
      this.unsaveForm.numFactor = item.num_factor;
      this.unsaveForm.title =
        this.themeList[0].analysis_name +
        "-" +
        this.unsaveForm.numFactor +
        " 主题 " +
        this.unsaveForm.rotation +
        "（未保存）";
      this.loadFactorResult(this.unsaveForm);
    },
    getRotationClick(item) {
      this.unsaveForm.rotation = item.name;
      this.unsaveForm.title =
        this.themeList[0].analysis_name +
        "-" +
        this.unsaveForm.numFactor +
        " 主题 " +
        this.unsaveForm.rotation +
        "（未保存）";
      this.loadFactorResult(this.unsaveForm);
    },
    getSavedSolutionsClick(item) {
      this.saveForm.analysisKey = item.fact_corr_key;
      this.saveForm.includeGroups = item.include_groups;
      this.saveForm.rotation = item.rotation;
      this.saveForm.numFactor = item.num_factor;
      this.saveForm.index = item.index;
      this.saveForm.title = item.analysis_name + "（已保存）";
      this.loadFactorResult(this.saveForm);
    },
    getSavedSolutionsRow(item) {
      item.row.index = item.rowIndex;
    },
    loadFactorResult(object) {
      this.currentForm = object;
      let target = this;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        numFactor: object.numFactor,
        analysisKey: object.analysisKey,
        rotation: object.rotation,
        includeGroups: object.includeGroups
      };
      this.getFactorResultData();
      getLoadFactorResult(params).then(res => {
        if (res.code == 2000000) {
          this.series = [];
          this.factorResultData = res.data;
          this.categories = res.data.categories;
          let list = res.data.series;
          let ll = list.length > 0 ? list[0] : [];
          for (let i = 0; i < ll.length; i++) {
            let x = [];
            for (let j = 0; j < list.length; j++) {
              if (list[j][i] == 0) {
                continue;
              }
              if (list[j][i]) {
                x.push(list[j][i]);
              } else {
                x.push("");
              }
            }
            let item = {
              data: x,
              events: {
                click: function(e) {
                  var index = e.point.index;
                  target.factorInd = index + 1;
                  target.factorName = target.categories[index];
                  let query = {datasetKey:target.datasetKey,projectId:target.projectId,numFactor:object.numFactor,analysisKey: object.analysisKey,rotation: object.rotation,includeGroups: object.includeGroups,factorInd:index};
                  getFamilyList(query).then( resp=> {
                    target.$refs.rightChart.chart.update({"xAxis":{categories:resp.data.categories,labels:{ enabled:false }}});
                    target.$refs.rightChart.chart.update({"series":[{data:resp.data.series,events:{ click: function(e) {
                      target.clusterKey = resp.data.groupKeys[e.point.index];
                      target.sku.title = resp.data.categories[e.point.index];
                      target.sku.visible = true;
                      target.skuList();
                    }}}]});
                  });
                }
              }
            };
            target.series.push(item);
          }
          this.initLeftChart(res.data.categories, this.series);
          this.initRightChart([]);
          this.$refs.leftChart.chart.update({ title: { text: object.title } });
        } else {
          this.initLeftChart([], []);
          this.initRightChart([]);
        }
      });
    },
    initLeftChart(categories, series) {
      this.leftChart.options = {
        chart: { type: "column" },
        title: { text: "" },
        xAxis: { categories: categories },
        yAxis: {
          min: 0,
          title: { text: "values" }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}"><b>{point.y}</b>({point.percentage:.0f}%)</span><br/>',
          shared: true
        },
        plotOptions: { column: { stacking: "normal" } },
        credits: { enabled: false },
        exporting: { enabled: false },
        series: series
      };
      this.leftChart.styles = {
        widht: "100%",
        height: "20em"
      };
      this.$refs.leftChart.initChart(this.leftChart.options);
    },
    initRightChart(categories) {
      this.rightChart.options = {
        chart: { type: "bar" },
        title: {
          text: null
        },
        xAxis: {
          categories: categories
        },
        plotOptions: {
          series: {
            dataLabels: {
              align: "left",
              enabled: true,
              format: "{x}",
              inside: true
            }
          }
        },
        yAxis: {
          title: { text: "" }
        },
        exporting: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        series: [
          {
            data: [0, 0, 0, 0, 0]
          }
        ]
      };
      this.rightChart.styles = {
        widht: "100%",
        height: "20em"
      };
      this.$refs.rightChart.initChart(this.rightChart.options);
    },
    skuList(){
      let params = {datasetKey:this.datasetKey,projectId:this.projectId,groupKey:this.clusterKey};
      getSkuList(params).then( res=>{
        this.sku.data = res.data.list;
      });
    },
    handleDeleteFactorAnalysis(index,item) { // 删除主题分析
      let analysisKey = item.analysis_key;
      let analysisName = item.analysis_name;
      let params = {datasetKey:this.datasetKey,projectId:this.projectId,analysisKey:analysisKey};
      this.$confirm('确定删除'+analysisName+'主题分析?', '信息', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
            deleteFactorAnalysis(params).then( res=>{
              if(res.code==2000000) {
                this.themeList.splice(index,1);
                this.numFactorList = [];
                this.rotationList = [];
                this.initLeftChart([],[]);
                this.$refs.leftChart.chart.update({"xAxis":{categories:[]}});
                this.$refs.rightChart.chart.update({"series":[]});
                this.$refs.rightChart.chart.update({"xAxis":{categories:[],labels:{ enabled:false }}});
                this.$refs.rightChart.chart.update({"series":[]});
                this.initRightChart([],[]);
                this.getPurchaseThemesData();
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
    handleDelFactorSolution(index,item) { //删除已保存的方案
      let analysisKey = item.fact_corr_key;
      let analysisName = item.analysis_name;
      let params = {datasetKey:this.datasetKey,projectId:this.projectId,analysisKey:analysisKey};
      this.$confirm('确定删除'+analysisName+'主题方案?', '信息', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          deleteFactorSolution(params).then( res=>{
              if(res.code==2000000) {
                this.savedSolutionsList.splice(index,1);
                //target.numFactorData = [];
                //target.rotationData = [];
                this.initLeftChart([],[]);
                this.$refs.leftChart.chart.update({"xAxis":{categories:[]}});
                this.$refs.rightChart.chart.update({"series":[]});
                this.$refs.rightChart.chart.update({"xAxis":{categories:[],labels:{ enabled:false }}});
                this.$refs.rightChart.chart.update({"series":[]});
                this.initRightChart([],[]);
                this.saveForm.index = null;
                this.getSaveSolutionsData();
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
    handleSaveFactorName(){
      let target = this;
      if(!this.currentForm) {
          this.$message({
                  type: 'error',
                  message:"请选择主题方案！"
          });
          return ;
      }
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        numFactor:this.numFactor,
        analysisKey:this.analysisKey,
        name:this.factorName,
        rotation:this.rotation,
        factorInd:this.factorInd,
        includeGroups:this.includeGroups
      };
      saveFactorName(params).then(res=>{
        if(res.code==2000000) {
          this.factorName = '';
            target.GetSavedSolutions();
            target.loadFactorResult(target.currentForm);
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
    },
    GetSavedSolutions(getSavedSolutions){
      let target = this;
      let params = {datasetKey:this.datasetKey,projectId:this.projectId};
      getSavedSolutions(params).then(res=>{
        target.savedSolutionsList=res.data.list;
      });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>