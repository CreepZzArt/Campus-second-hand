<template>
  <div style="height: 60px;line-height:50px;border-bottom: 1px solid #ccc;display:flex;">
    <div style="width:180px;padding-left: 30px;font-weight: bold;color: dodgerblue;margin-top: 5px">校园二手交易平台</div>
    <div style="flex: 0.50"></div>
    <div class="themenu">
      <el-menu
          default-active="shop"
          mode="horizontal"
          style="width:500px;margin-left: 150px"
          router
      >
        <el-menu-item index="shop">首页</el-menu-item>
        <el-menu-item index="wares">商品</el-menu-item>
        <el-menu-item index="thehtml">关于网站</el-menu-item>
      </el-menu>
    </div>
    <div style="flex: 0.55"></div>
    <div style="width:100px;margin-top: 15px;">
      <el-dropdown>
        <el-button type="primary">
          用户<el-icon :size="20" class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/login')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

</template>

<script>

import { ArrowDown } from '@element-plus/icons-vue'
export default {
  name:"Header",
  components:{
    ArrowDown,
  },
  methods:{

  }
}
</script>

<style scoped>
.themenu{
  margin-top: 1px;
}
</style>