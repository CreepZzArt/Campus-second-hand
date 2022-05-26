<template>
  <div>
    <!-- 头部 -->
    <Header/>
    <!-- 主体 -->
    <div style="display:flex">
      <!-- 侧边栏 -->
      <Menu/>
      <!-- 内容区域 -->
      <router-view style="flex:1"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'
export default{
  name:"Layout",
  components:{
    Header,
    Menu,
  }
}
</script>

<style scoped>

</style>