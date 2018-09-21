<template>
  <div >
    <transition appear appear-active-class="animated fadeInLeft">
       <div class="set">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础设置" name="first">
              <set-a :datas="abc"></set-a>
            </el-tab-pane>
            <el-tab-pane label="支付设置" name="second"><set-b></set-b></el-tab-pane>
              <!-- <el-tab-pane label="C" name="third"><set-c></set-c></el-tab-pane> -->
          </el-tabs>
      </div>      
    </transition>
  </div>
 
</template>

<script>
import SetA from './components/set/Set-a.vue'
import SetB from './components/set/Set-b.vue'
import SetC from './components/set/Set-c.vue'
export default {
  name: 'Set',
  data() {
    return {
    	activeName: 'first',
    	abc:[], 
    }
  },
  components: {
    SetA,
    SetB,
    SetC,
  }, 
  methods:{
  	
  }
}
</script>
 
<style lang="less" scoped="">
.set{line-height: 30px;}
</style>
