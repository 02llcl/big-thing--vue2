<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix header-box">
          <span>文章分类</span>
          <el-button type="primary" size="mini" @click="addCateShowFn">添加分类</el-button>
        </div>
        <template>
            <el-table
            :data="cateList"
            style="width: 100%">
            <el-table-column
                type="index"
                prop="id"
                label="序号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="cate_name"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="cate_alias"
                label="别名">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
                    <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delcateFn(scope.row.id)">
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
            </el-table>
            <el-dialog
            :title="isEdit ? '编辑文章分类' : '添加文章分类'"
            @close="dialogCloseFn"
            :visible.sync="dialogVisible"
            width="30%">
              <!-- 添加的表单 -->
              <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
                <el-form-item label="分类名称" prop="cate_name">
                  <el-input v-model="addForm.cate_name" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="cate_alias">
                  <el-input v-model="addForm.cate_alias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmfn">确 定</el-button>
            </span>
        </el-dialog>    
        </template>
      </el-card>
    </div>
  </template>
  
  <script>
  import {getArtCateListAPI,addArtCateAPI,updateArtCateAPI,delArtCateAPI} from '@/api/index'
  export default {
    name: 'ArtCate',
    data () {
        return{
            cateList: [],
            dialogVisible: false,
            addForm:{
              cate_name:'',
              cate_alias:''
            },
            isEdit: true,
            EditId: '',
            addRules: { // 添加表单的验证规则对象
              cate_name: [
                { required: true, message: '请输入分类名称', trigger: 'blur' },
                { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
              ],
              cate_alias: [
                { required: true, message: '请输入分类别名', trigger: 'blur' },
                { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
              ]
            }
        }
    },
    created () {
         // 获取文章分类
    this.initCateListFn()
    },
    methods: {
    // 获取文章分类
      async initCateListFn () {
        const res = await getArtCateListAPI()
        this.cateList = res.data.data
        console.log(res);
      },
      addCateShowFn(){
        this.isEdit=false
        this.EditId=''
        this.dialogVisible=true
      },
      confirmfn(){
        this.$refs.addRef.validate(async valid => {
          if(valid){
            if(!this.isEdit){
              const {data: res} = await addArtCateAPI(this.addForm)
              if(res.code!==0) return this.$message.error(res.message)
              this.$message.success(res.message)
            }
            else{
              this.addForm.id=this.EditId
              const {data:res} = await updateArtCateAPI(this.addForm)
              console.log(res)
              if(res.code!==0) return this.$message.error(res.message)
              this.$message.success(res.message)
            } 
              
              this.initCateListFn()
          }else{
            return false
          }
        })
        this.dialogVisible = false
      },
      dialogCloseFn(){
        this.$refs.addRef.resetFields()
      },
      updateFn(obj){
        console.log(obj)
        this.isEdit=true
        this.EditId=obj.id
        this.dialogVisible= true
        this.$nextTick(() => {
          // 这里开始赋值
          this.addForm.cate_alias=obj.cate_alias
          this.addForm.cate_name=obj.cate_name
        })
        
      },
      async delcateFn(id){
        const { data:res } = await delArtCateAPI(id)
        if (res.code !== 0) return this.$message.error('删除分类失败！')
        this.$message.success('删除分类成功！')
        // 重新请求列表数据
        this.initCateListFn()
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  