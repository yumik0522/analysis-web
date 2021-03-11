<template>
  <el-container class="content" style="overflow:hidden;">
    <el-main>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="主题运算" name="first">
          <operation></operation>
        </el-tab-pane>
        <el-tab-pane label="查看结果" name="second">    
          <purchase></purchase> 
        </el-tab-pane>
        <el-tab-pane label="运算市场细分" name="third">
          <segmentation :targetActive="activeName"></segmentation>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import {
  getOperationList,
  runFactorAnalysis,
  getDistributionList,

  purchaseThemes,
  getNumFactorList,
  getFactorResult,
  getFactorResultList,
  getLoadFactorResult,
  getSaveSolutions
} from "api/business/theme/index";
import { mapGetters } from "vuex";
export default {
  name: "theme",
  components: {
    'operation': () => import('./components/operation'),
    'purchase': () => import('./components/purchase'),
    'segmentation': () => import('./components/segmentation')
  },
  data() {
    return {
      activeName: "second",
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    
  }
};
</script>