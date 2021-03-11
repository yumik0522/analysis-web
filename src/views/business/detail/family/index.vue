<template>
  <el-container class="content">
    <el-main>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="商品家族分析" name="first">
          <el-form label-width="200px" size="mini">
            <el-form-item label="请选择Hier1：">
              <el-select v-model="hierVal" filterable placeholder="请选择" @change="changeHierSel">
                <el-option
                  v-for="item in hierOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="剔除过少消费者数量的商品：">
              <el-input-number controls-position="right" v-model="form.minSale" :min="0"></el-input-number>
            </el-form-item>
          </el-form>
          <el-row style="margin-top:8em;">
            <el-button
              type="primary"
              :disabled="hierVal===''"
              @click.prevent="gettop20Data"
            >查看前20名商品</el-button>
            <el-button
              type="primary"
              :disabled="hierVal===''"
              @click.prevent="getDistributionData"
            >查看消费者数量分布</el-button>
            <el-button @click.prevent="calAll" type="primary">运算全部Hier1的家族</el-button>
            <el-button @click.prevent="cal" :disabled="hierVal===''" type="primary">仅运算选择Hier1</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="组合选择" name="second">
          <el-form label-width="100px" size="mini">
            <el-form-item label="Hier1：">
              <el-select v-model="hierVal" filterable placeholder="请选择" @change="changeHierSel">
                <el-option
                  v-for="item in hierOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-container>
            <el-aside width="auto">
              <el-table
                ref="recommTable"
                :data="recomm.list"
                border
                @row-click="recommCellClick"
                @current-change="handleCurrentChange"
                highlight-current-row
                height="350"
                style="width: 100%"
              >
                <el-table-column label="推荐">
                  <template slot-scope="scope">
                    <div
                      v-if="scope.row.highlight_ind==0"
                      style="width: 16px; height: 16px; margin:0px 0 0 8px;background-color:#4b4b4b; border-radius: 50%; -moz-border-radius: 50%; -webkit-border-radius: 50%;"
                    ></div>
                    <div
                      v-else
                      style="width: 16px; height: 16px; margin:0px 0 0 8px;background-color:#93c66b; border-radius: 50%; -moz-border-radius: 50%; -webkit-border-radius: 50%;"
                    ></div>
                  </template>
                </el-table-column>
                <el-table-column prop="g" label="#"></el-table-column>
                <el-table-column prop="pseudot2_ind" label="组合的可能" width="180"></el-table-column>
                <el-table-column prop="pseudot2" label="得分"></el-table-column>
              </el-table>
            </el-aside>
            <el-container>
              <el-main style="padding: 0 0px 0 20px;">
                <el-table
                  :data="recomm.saleList"
                  border
                  @row-click="recommSaleCellClick"
                  highlight-current-row
                  height="350"
                  style="width: 100%"
                >
                  <el-table-column prop="group_name" label="商品家族" width="180"></el-table-column>
                  <el-table-column prop="num_prod" label="商品数" width="180"></el-table-column>
                  <el-table-column prop="perc_prod" label="商品数占比">
                    <template slot-scope="scope">
                      <el-progress :stroke-width="16" :percentage="(scope.row.perc_prod|0)"></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="spend" label="销售额"></el-table-column>
                  <el-table-column prop="perc_spend" label="销售额占比">
                    <template slot-scope="scope">
                      <el-progress :stroke-width="16" :percentage="(scope.row.perc_spend|0)"></el-progress>
                    </template>
                  </el-table-column>
                </el-table>
              </el-main>
              <el-footer>
                <el-row :gutter="20" style="margin-top:1em;">
                  <el-form label-width="200px" size="mini">
                    <el-col :span="12">
                      <el-form-item label="保存该商品组合为（名字）：">
                        <el-input v-model="recomm.familyName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                  <el-col :span="12">
                    <el-button
                      @click.prevent="handleSaveClusterSolution"
                      :disabled="hierVal===''"
                      type="primary"
                    >保存命名</el-button>
                  </el-col>
                </el-row>
              </el-footer>
            </el-container>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="查看/编辑" name="third">
          <el-form label-width="200px" size="mini">
            <el-row>
              <el-col style="width:auto;padding-right: 20px;">
                <el-form-item label="保存的商品家族组合：">
                  <el-select
                    v-model="digtalVal"
                    filterable
                    placeholder="请选择"
                    @change="changeDigitalSel"
                  >
                    <el-option
                      v-for="item in digitalOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="width:auto;padding-right: 20px;">
                <el-form-item label="将该商品家族组合重命名为：">
                  <el-input style="width:193px;" v-model="clusterSolution.solutionName"></el-input>
                </el-form-item>
              </el-col>
              <el-button
                @click.prevent="handleUpdateSolutionName"
                :disabled="digtalVal===''"
                type="primary"
              >重命名组合</el-button>
              <el-button
                @click.prevent="handleDeleteSolution"
                :disabled="digtalVal===''"
                type="primary"
              >删除该组合</el-button>
              <el-button
                @click.prevent="exportExcel"
                type="primary"
                :disabled="digtalVal===''"
              >导出该组合</el-button>
            </el-row>
          </el-form>
          <el-container>
            <el-aside width="auto">
              <el-table
                ref="solutionsTable"
                :data="clusterSolution.solutionsList"
                border
                @row-click="solutionCellClick"
                @current-change="handleCurrentChange"
                highlight-current-row
                height="350"
                style="width: 100%"
              >
                <el-table-column type="index"></el-table-column>
                <el-table-column
                  prop="group_name"
                  width="200"
                  :show-overflow-tooltip="true"
                  label="商品家族"
                ></el-table-column>
                <el-table-column prop="num_prod" label="数量"></el-table-column>
                <el-table-column prop="perc_spend" label="占比">
                  <template slot-scope="scope">{{Math.round(scope.row.perc_spend*100)/100+'%'}}</template>
                </el-table-column>
              </el-table>
            </el-aside>
            <el-container>
              <el-main style="padding: 0 0px 0 20px;">
                <el-table :data="clusterSolution.skuList" height="350" border style="width: 100%">
                  <el-table-column
                    prop="prod_code"
                    label="SKU"
                    :show-overflow-tooltip="true"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    prop="prod_desc"
                    label="品名"
                    :show-overflow-tooltip="true"
                    width="200"
                  ></el-table-column>
                  <el-table-column prop="total_spend" label="销售额"></el-table-column>
                  <el-table-column prop="total_cust" label="消费者数"></el-table-column>
                  <el-table-column prop="avg_price" label="价格"></el-table-column>
                </el-table>
              </el-main>
              <el-footer>
                <el-row :gutter="20" style="margin-top:1em;width:100%;">
                  <el-form label-width="200px" size="mini">
                    <el-col :span="12">
                      <el-form-item label="将该商品家族重命名为：">
                        <el-input v-model="clusterSolution.groupName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                  <el-col :span="12">
                    <el-button
                      @click.prevent="handleUpdateGroupName"
                      :disabled="digtalVal===''"
                      type="primary"
                    >重命名商品家族</el-button>
                    <el-button type="primary" :disabled="digtalVal===''">气泡图</el-button>
                  </el-col>
                </el-row>
              </el-footer>
            </el-container>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="查看前20名商品" :visible.sync="top20.visible" width="900px">
        <el-table :data="top20.list" border height="310px">
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column property="prod_code" :show-overflow-tooltip="true" label="SKU"></el-table-column>
          <el-table-column property="prod_desc" :show-overflow-tooltip="true" label="品名"></el-table-column>
          <el-table-column property="total_spend" :show-overflow-tooltip="true" label="销售额"></el-table-column>
          <el-table-column property="total_cust" :show-overflow-tooltip="true" label="消费者数"></el-table-column>
          <el-table-column property="avg_price" :show-overflow-tooltip="true" label="价格"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <el-dialog title="查看消费者数量分布" :visible.sync="distribution.visible" width="900px">
        <el-table :data="distribution.list" border height="310px">
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column property="perc_desc" :show-overflow-tooltip="true" label="十等分"></el-table-column>
          <el-table-column property="num_prod" :show-overflow-tooltip="true" label="商品数"></el-table-column>
          <el-table-column property="min_stats" :show-overflow-tooltip="true" label="最小消费者数"></el-table-column>
          <el-table-column property="max_stats" :show-overflow-tooltip="true" label="最大消费者数"></el-table-column>
          <el-table-column property="perc_spend" :show-overflow-tooltip="true" label="销售占比">
            <template slot-scope="scope">{{Math.round(scope.row.perc_spend*100)/100+'%'}}</template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
      <el-dialog :title="sku.title" :visible.sync="sku.visible" width="900px">
        <el-table :data="sku.list" border height="310px">
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column property="prod_code" :show-overflow-tooltip="true" label="SKU"></el-table-column>
          <el-table-column property="prod_desc" :show-overflow-tooltip="true" label="品名"></el-table-column>
          <el-table-column property="total_spend" :show-overflow-tooltip="true" label="销售额"></el-table-column>
          <el-table-column property="total_cust" :show-overflow-tooltip="true" label="消费者数"></el-table-column>
          <el-table-column property="avg_price" :show-overflow-tooltip="true" label="价格"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import {
  getHierList,
  getDigitalList,
  getRecommList,
  getRecommSaleList,
  getSkuList,
  getTop20List,
  getDistributionList,
  saveClusterSolution,
  getSolutionsList,
  updateGroupName,
  deleteSolution,
  runClusterAll,
  runCluster
} from "api/business/family/index";
import { mapGetters } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      activeName: "second",
      hierOptions: [],
      digitalOptions: [],
      hierVal: "",
      digtalVal: "",
      sku: {
        //sku弹窗
        visible: false,
        list: [],
        title: ""
      },

      top20: {
        //top20弹窗
        visible: false,
        list: []
      },
      distribution: {
        //查看分布
        visible: false,
        list: []
      },
      form: {
        // 表单
        parentKey: 0, // 当前部门ID
        minSale: 0, // 剔除过少消费者数量的商品
        deptName: "" // 当前部门名称
      },
      recomm: {
        // 组合选择
        list: [],
        saleList: [],
        currentRow: null,
        familyName: "",
        g: 2
      },
      clusterSolution: {
        solutionKey: 0,
        solutionName: "",
        groupKey: 0,
        groupName: "",
        currentData: null,
        currentIndex: 0,
        clusterKey: 0,
        skuList: [],
        solutionsList: []
      },
      initVisible: false
    };
  },
  created() {
    if (this.$route.query) {
      this.projectId = this.$route.query.projectId;
      this.datasetKey = this.$route.query.datasetKey;
      if (this.$route.query.layid == 22) {
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
        this.getHierOption();
        this.getDigitalOption();
        this.initVisible = true;
      }
    },
    cal() {
      //仅运算选择Hier1
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        deptKey: this.hierVal,
        deptName: this.form.deptName,
        minSale: this.form.minSale
      };
      this.$confirm("确定计算该Hier1下的商品?", "信息", {
        confirmButtonText: "计算",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          runCluster(params).then(res => {
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
        }
      });
    },
    calAll() {
      //运算全部Hier1的家族
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        minSale: this.form.minSale
      };
      this.$confirm("确定计算全部Hier1的家族?", "信息", {
        confirmButtonText: "计算",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          runClusterAll(params).then(res => {
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
        }
      });
    },
    gettop20Data() {
      //查看前20名商品
      this.top20.visible = true;
      let target = this;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        parentKey: this.form.parentKey
      };
      getTop20List(params).then(res => {
        this.top20.list = res.data.list;
      });
    },
    getDistributionData() {
      //查看消费者数量分布
      this.distribution.visible = true;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        parentKey: this.form.parentKey
      };
      getDistributionList(params).then(res => {
        this.distribution.list = res.data.list;
      });
    },
    getHierOption() {
      //商品家族分析>Hier1选项
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      getHierList(params).then(res => {
        this.hierOptions = [];
        for (let i = 0; i < res.data.list.length; i++) {
          let obj = {};
          obj.value = res.data.list[i].prod_sys_key;
          obj.label = res.data.list[i].prod_desc;
          this.hierOptions.push(obj);
        }
      });
    },
    getDigitalOption() {
      //组合选择>Hier1选项
      let params = { datasetKey: this.datasetKey, projectId: this.projectId };
      getDigitalList(params).then(res => {
        this.digitalOptions = [];
        for (let i = 0; i < res.data.list.length; i++) {
          let obj = {};
          obj.value = res.data.list[i].solution_key;
          obj.label = res.data.list[i].solution_name;
          this.digitalOptions.push(obj);
        }
      });
    },
    changeHierSel(val) {
      this.form.parentKey = val;
      this.getRecommData();
      this.getRecommSaleData();
      let obj = {};
      obj = this.hierOptions.find(item => {
        return item.value === val;
      });
      this.form.deptName = obj.label;
      this.recomm.familyName = obj.label + this.recomm.g;
    },
    changeDigitalSel(val) {
      this.clusterSolution.solutionKey = val;
      this.getSolutionsData();
      let obj = {};
      obj = this.digitalOptions.find(item => {
        return item.value === val;
      });
      this.clusterSolution.solutionName = obj.label;
    },
    getRecommData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        parentKey: this.form.parentKey
      };
      getRecommList(params).then(res => {
        this.recomm.list = res.data.list;
        this.$refs.recommTable.setCurrentRow(this.recomm.list[0]);
      });
    },
    getRecommSaleData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        parentKey: this.form.parentKey,
        g: this.recomm.g
      };
      getRecommSaleList(params).then(res => {
        this.recomm.saleList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      this.recomm.currentRow = val;
    },
    recommCellClick(item) {
      this.recomm.g = item.g;
      this.getRecommSaleData();
      this.recomm.familyName = this.form.deptName + this.recomm.g;
    },
    recommSaleCellClick(item) {
      this.clusterSolution.clusterKey = item.cluster_key;
      this.sku.title = item.group_name;
      this.sku.visible = true;
      this.getSkuData();
    },
    getSkuData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        groupKey: this.clusterSolution.clusterKey
      };
      getSkuList(params).then(res => {
        this.sku.list = res.data.list;
      });
    },
    handleSaveClusterSolution() {
      //保存命名
      let target = this;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        deptKey: this.form.parentKey,
        numCluster: this.recomm.g,
        name: this.recomm.familyName
      };
      saveClusterSolution(params).then(res => {
        if (res.code == 2000000) {
          this.$emit("themeList");
          this.getDigitalOption();
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
    solutionCellClick() {
      this.clusterSolution.groupKey = item.group_key;
      this.clusterSolution.groupName = item.group_name;
      this.clusterSolution.currentData = item;
      this.clusterSolution.currentIndex = item.index;
      this.getSolutionsSkuData();
    },
    getSolutionsData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        solutionKey: this.clusterSolution.solutionKey
      };
      getSolutionsList(params).then(res => {
        this.clusterSolution.solutionsList = res.data.list;
        this.$refs.solutionsTable.setCurrentRow(
          this.clusterSolution.solutionsList[0]
        );
        this.clusterSolution.groupKey = this.clusterSolution.solutionsList[0].group_key;
        this.clusterSolution.groupName = this.clusterSolution.solutionsList[0].group_name;
        this.getSolutionsSkuData();
        this.clusterSolution.currentData = this.clusterSolution.solutionsList[0];
        this.clusterSolution.currentIndex = 0;
      });
    },
    getSolutionsSkuData() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        solutionKey: this.clusterSolution.solutionKey,
        groupKey: this.clusterSolution.groupKey
      };
      getSkuList(params).then(res => {
        this.clusterSolution.skuList = res.data.list;
      });
    },
    handleUpdateGroupName() {
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        groupKey: this.clusterSolution.groupKey,
        name: this.clusterSolution.groupName
      };
      updateGroupName(params).then(res => {
        if (res.code == 2000000) {
          this.clusterSolution.currentData.group_name = this.groupName;
          this.clusterSolution.solutionsList[
            this.clusterSolution.currentIndex
          ] = this.clusterSolution.currentData;
          this.$emit("themeList");
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
    handleDeleteSolution() {
      //删除商品组合
      let target = this;
      let params = {
        datasetKey: this.datasetKey,
        projectId: this.projectId,
        solutionKey: this.clusterSolution.solutionKey
      };
      this.$confirm(
        "确定删除该商品组合" + this.clusterSolution.solutionName + "?",
        "信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          callback: action => {
            deleteSolution(params).then(res => {
              this.clusterSolution.solutionName = "";
              this.digtalVal = "";
              this.getDigitalOption();
              this.clusterSolution.solutionsList = [];
              this.clusterSolution.skuList = [];
              if (res.code == 2000000) {
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
          }
        }
      );
	},
	handleUpdateSolutionName(){//重命名商品组合
		let params = {datasetKey:this.datasetKey,projectId:this.projectId,solutionKey:this.clusterSolution.solutionKey,name:this.clusterSolution.solutionName};
		updateSolutionName(params).then( res => {
			if(res.code==2000000) {
				this.getDigitalOption();	
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
  }
};
</script>
