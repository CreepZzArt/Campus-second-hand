<template>

<div style="padding:10px">
<!-- 功能区 -->
  <div  style="margin:10px 0px;">
    <el-button type="primary" @click="add()">添加</el-button>
    <el-button type="primary">导入</el-button>
    <el-button type="primary">导出</el-button>
  </div>
  <!-- 查找区 -->
  <div style="margin:10px 0px">
    <el-input v-model="search" placeholder="输入查找内容" style="width:20%" clearable/>
    <el-button type="primary" style="margin-left:10px" @click="load()">查找</el-button>
  </div>
  <!-- 表格区 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"/>
    <el-table-column prop="username" label="用户名" width="180"/>
    <el-table-column prop="nickName" label="昵称"/>
    <el-table-column prop="age" label="年龄"/>
    <el-table-column prop="sex" label="性别"/>
    <el-table-column prop="address" label="地址"/>
    <el-table-column  label="操作" width="150">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row.id)">
          <template #reference>
            <el-button type="danger" plain size="small" >删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div style="margin:10px 0px">
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="添加" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名" >
            <el-input v-model="form.username" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="昵称" >
            <el-input v-model="form.nickName" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="性别" >
            <el-radio v-model="form.sex" label="男" size="large" >男</el-radio>
            <el-radio v-model="form.sex" label="女" size="large" >女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="form.age" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="地址" >
            <el-input type="textarea" v-model="form.address" style="width: 80%"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</div>
</template>
<script>

export default{
  data() {
  return {
    form:{},
    dialogVisible:false,
    search:'',
    currentPage:1,
    pageSize:10,
    total:0,
    tableData: [],
  }
},
  //页面加载时调用
  created() {
     this.load()
  },
  methods: {
    async load() {
      try {
        let res = await this.$Get('/api/user',{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        });

        if(res && res.code==0){
          this.tableData = res.date.records
          this.total = res.date.total
        }

      } catch (error) {
        console.log('---load-error---', error);
      }
    },
    add() {
      this.dialogVisible = true
    },
    async save() {
       // 如果是更新 如果不是就是添加
      if(this.form.id) {
        try {
          let res = await this.$Request('put', '/api/user/updateUserById', this.form);
          console.log('---save-update---', res);
          if (res && res.code == 0) {
            this.$message.success('更新成功');
            this.dialogVisible = false;
            this.form = {};
            this.load();
          }
        }catch (error) {
          console.log('---load-error---', error);
        }
      }else{
        try{
          let res = await this.$Post('/api/user',this.form);
          console.log('---save-update---',res);
          if(res && res.code ==0){
            this.$message.success('添加成功');
            this.dialogVisible = false;
            this.form = {};
            this.load();
          }
        }catch (error) {
          console.log('---load-error---', error);
        }
      }
    },
    async handleDelete(id) {
      try {
        let res = await this.$Request('delete',`/api/user/${id}`);
        console.log('---delete-res---',res)
        if(res && res.code==0){
          this.$message.success('删除成功');
          this.load();
        }
      } catch (error) {
        console.log('---loginFn-error---', error);
      }
    },
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleSizeChange(pageSize){//改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){//改变页码触发
      this.currentPage = pageNum
      this.load()
    }

    },

  }

</script>
