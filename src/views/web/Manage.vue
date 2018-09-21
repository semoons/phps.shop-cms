<template>
  <div >
    <transition appear appear-active-class="animated fadeInLeft">
      <div class="manage">
         <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户列表" name="first"><manage-a></manage-a></el-tab-pane>
          <!-- <el-tab-pane label="权限组" name="second"><manage-b></manage-b></el-tab-pane> -->
          <!-- <el-tab-pane label="操作日志" name="third"><manage-c></manage-c></el-tab-pane> -->
        </el-tabs>
      </div>     
    </transition>
  </div>
  
</template>

<script>
import ManageA from './components/manage/Manage-a.vue'
import ManageB from './components/manage/Manage-b.vue'
import ManageC from './components/manage/Manage-c.vue'
export default {
  name: 'Manage',
  data() {
      return {
      	activeName: 'first',
      	
      }
    },
  components: {
    ManageA,
    ManageB,
    ManageC,
  }, 
  methods:{
  	handleClick(tab, event) {
        console.log(tab, event);
      },
  		 
  }
}
</script>
 
<style lang="less" scoped="">
.manage{line-height: 30px;} 
</style>
