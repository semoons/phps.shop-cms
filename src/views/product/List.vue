
<template>
  <div class="list">
    <transition appear appear-active-class="animated fadeInLeft">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="销售商品" name="first"><list-a></list-a></el-tab-pane>
          <el-tab-pane label="下架商品" name="second"><list-b></list-b></el-tab-pane>
          
        </el-tabs>
        
      </div>
    </transition>
  </div>
</template>

<script>
  import ListA from './components/list/List-a.vue'
  import ListB from './components/list/List-b.vue'
  
  
  export default {
    name: 'List', 
    data() {
      return {
        activeName: 'first',
        visible2: false,
        product:[], 
        addShow: false,
        eid:0,
        page:[]
      }
    }, 
    components: {
      ListA,
      ListB,
    }, 
    methods:{
      

},


//vue生命函数
mounted (){ 
 
} 
}
</script>

<style lang="less" scoped="">
.list{line-height: 30px;text-align:left;}

</style>
