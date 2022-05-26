<template>
    <div style="height: 50px;line-height:50px;border-bottom: 1px solid #ccc;display: flex;">
        <div style="width:180px;padding-left: 30px;font-weight: bold;color: dodgerblue;">交易平台后台管理</div>
        <div style="flex: 0.95"></div>
        <div style="width:100px;margin-top: 10px;">
            <el-dropdown>
                <el-button type="primary">
                    Admin<el-icon :size="20" class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/login')">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script >
import { ArrowDown } from '@element-plus/icons-vue'
export default {
    name:"Header",
    components:{
        ArrowDown,
    }
}
</script>
<style scoped>


</style>