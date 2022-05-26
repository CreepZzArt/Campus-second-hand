<template>
    <div>
        <el-menu
        default-active="user"
        router
        class="el-menu-vertical-demo" style="width: 200px;min-height: calc(100vh - 50px);">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>管理系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user">用户界面表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item index="upset">商品列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
</template>

<script>
import { Setting,Location,Document,Menu} from '@element-plus/icons'
export default {
    name:"Menucop",
    components:{
        Location,
        Setting,
        Document,
        Menu,
    }
}
</script>

<style>

</style>
