<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
     <el-button-group>
    <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
    <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
    <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
  </el-button-group>
  </div>
<el-card class="box-card">
<el-row>
  <el-col :span="24">
    <el-checkbox v-model="detailChecked" :disabled="form.code===undefined?true:false">查看详情<i class="el-icon-view el-icon--right"></i></el-checkbox>
    <span v-if="detailChecked&&form.code" style="font-weight: 500;margin-left:20px;">路径编码：<span style="color:#97a8be">{{form.code}}</span></span>
    <span v-if="detailChecked&&form.title" style="font-weight: 500;"><span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>标题：<span style="color:#97a8be">{{form.title}}</span></span>
    <span v-if="detailChecked&&form.parentId" style="font-weight: 500;"><span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>父级节点：<span style="color:#97a8be">{{form.parentId}}</span></span>
    <span v-if="detailChecked&&form.href" style="font-weight: 500;"> <span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>资源路径：<span style="color:#97a8be">{{form.href}}</span></span>
    <span v-if="detailChecked&&form.type" style="font-weight: 500;"> <span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>类型：<span style="color:#97a8be">{{form.type}}</span></span>
    <span v-if="detailChecked&&form.orderNum" style="font-weight: 500;"> <span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>排序：<span style="color:#97a8be">{{form.orderNum}}</span></span>
    <span v-if="detailChecked&&form.description" style="font-weight: 500;"> <span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>描述：<span style="color:#97a8be">{{form.description}}</span></span>
    <span v-if="detailChecked&&form.attr1" style="font-weight: 500;"> <span style="color:#97a8be;margin: 0 9px;font-weight: 700;">/</span>前端组件：<span style="color:#97a8be">{{form.attr1}}</span></span>
  </el-col>
</el-row>
<el-row>
  <el-col :span="6" style='margin-top:15px;'>
    
    <el-input prefix-icon="wk-icon icon-search" style="padding-bottom: 10px;"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      node-key="id"
      highlight-current
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="menuTree"
      @node-click="getNodeData"
      default-expand-all
      >
    </el-tree>
  </el-col>
  <el-col :span="18" style='margin-top:15px;'>
    <menu-element :menuId='currentId' ref="menuElement"></menu-element>
  </el-col>
</el-row>

</el-card>
  <el-dialog v-dialogDrag :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
      <el-form-item label="路径编码" prop="code">
          <el-input v-model="form.code" :disabled="formEdit"  placeholder="请输入路径编码"></el-input>
      </el-form-item>
          <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" :disabled="formEdit"  placeholder="请输入标题"></el-input>
      </el-form-item>
          <el-form-item label="父级节点" prop="parentId">
          <el-input v-model="form.parentId" :disabled="formEdit"  placeholder="请输入父级节点" readonly></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" :disabled="formEdit"  placeholder="请输入图标"></el-input>
      </el-form-item>
          <el-form-item label="资源路径" prop="href">
          <el-input v-model="form.href" :disabled="formEdit"  placeholder="请输入资源路径"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
         <el-select class="filter-item" v-model="form.type" :disabled="formEdit"   placeholder="请输入资源请求类型">
          <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
          <el-input v-model="form.orderNum" :disabled="formEdit"  placeholder="请输入排序"></el-input>
      </el-form-item>
      <el-form-item label="描述"   prop="description">
          <el-input v-model="form.description" :disabled="formEdit"  placeholder="请输入描述"></el-input>
      </el-form-item>
       <el-form-item label="前端组件" :disabled="formEdit"  prop="attr1">
          <el-input v-model="form.attr1"  placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>

  </div>
  
</template>

<script>
import {
  fetchTree, getObj, addObj, delObj, putObj
} from 'api/admin/menu/index';
import { mapGetters } from 'vuex';
export default {
  name: 'menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined
      },
      detailChecked:false,
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(data.id).then(response => {
        this.form = response.data;
      });
      this.currentId = data.id;
      this.showElement = true;
      this.$refs.menuElement.menuId = data.id;
      this.$refs.menuElement.getList();
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
        // this.resetForm();
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      }
    },
    handlerAdd() {
      this.resetForm();
      this.dialogStatus = 'create';
      this.formEdit = false;
      this.dialogFormVisible = true;
    },
    handleDelete() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    update() {
      putObj(this.form.id, this.form).then(() => {
        this.getList();
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
        this.dialogFormVisible = false;
      });
    },
    create(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            });
          })
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined
      };
    }
  }
}
</script>

