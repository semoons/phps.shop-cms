<template>
  <div >
    <transition appear appear-active-class="animated fadeInLeft">
      <div class="customer">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待审核" name="first"><customer-a></customer-a></el-tab-pane>
            <el-tab-pane label="已退款" name="second"><customer-b></customer-b></el-tab-pane>
           
          </el-tabs>
      </div>   
    </transition>
  </div>
  
</template>

<script>
import CustomerA from './components/customer/Customer-a.vue'
import CustomerB from './components/customer/Customer-b.vue'
export default {
  name: 'Customer',
  data() {
      return {
      	activeName: 'first',
      	
      }
    },
  components: {
    CustomerA,
    CustomerB,
    
  }
}
</script>
 
<style lang="less" scoped="">
.customer{line-height: 30px;text-align: left;} 
</style>
