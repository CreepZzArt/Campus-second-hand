<template>
  <div>
<!--    头部-->
    <ShopHeader/>
    <router-view style="flex:1"/>
  </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader";
export default {
  name: "Shoplayout",
  components:{
    ShopHeader
  }
}
</script>

<style scoped>

</style>