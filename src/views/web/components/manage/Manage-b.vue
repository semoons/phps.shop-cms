<template>
  <div class="manage">
    
    <div v-if="addShow" class="add-category "> 
      
      <div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
      <manage-power> </manage-power> 
    </div>
    <div class="list" v-if="!addShow">
      
      <div class="list-head">   
          <el-row>
            <el-button @click="handleEdit()" type="primary" size='small'>添加用户组</el-button> 
          </el-row>
      </div>
      <template>
        <el-table  style="width: 100%">
          <el-table-column  prop="nickname"  label="名称"  width="180"></el-table-column>
          <el-table-column  prop="create_time"  label="创建时间"  width="180"></el-table-column>
          <el-table-column  prop="openid"  label="openid"  width="280"></el-table-column>
          <el-table-column  prop="id"  label="ID"  width="80"></el-table-column>
          <el-table-column prop="is_visible" label="是否禁用" width="150">
              <template slot-scope="scope"> 
                <el-switch
                  @change="onswitch(scope.row.id)"
                  v-model="scope.row.is_visible"
                  active-color="#409EFF"
                    inactive-color="#DCDFE6">
                </el-switch>
              </template>
            </el-table-column>
          <el-table-column  prop="operation"  label="操作" >
            <template slot-scope="scope">
                <el-button  type="primary" size="small">查看</el-button>
              <el-button type="success" size="small">编辑</el-button>
                    
          <el-button style="margin-left: 10px" type="danger" size="small" slot="reference">删除</el-button>
          
              
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import ManagePower from './Power.vue'
export default {
  name: 'Manage-b',
  data() {
      return {
        addShow: false, //设置要显示的页面部分默认为false，隐藏 
        checkdDistributor: null,
        aid:0  

      }
    },
  components: {
     ManagePower,
  }, 
  methods:{
    
    handleEdit(row){  
          this.addShow = true; // addshow为要显示的页面  
          //this.aid = row;
      },
      back(){
        this.order_id = 0;
        this.addShow = false; 
      },
     
  }
}
</script>
 
<style lang="less" scoped="">
.manage{line-height: 30px;text-align: left;} 
.list-head{padding-bottom: 10px} 
</style>