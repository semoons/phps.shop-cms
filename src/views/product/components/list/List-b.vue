<template>
  <div class="">
     <div>
        <div v-if="addShow" class="add-category "> 
          <div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
          <Release :eid='eid'></Release> 
        </div>
        <div class="list" v-if="!addShow">
          
          <template>
            <el-table :data="product"  border style="width: 100%">   
              <el-table-column  type="index"  label="序号"  width="50"></el-table-column>
              <el-table-column  prop="goods_name"  label="商品名称"  width="420">
                <template slot-scope="scope"> 
                   <div class="product-img" v-if="scope.row.imgs"><img :src="scope.row.imgs.url"></div>
                  <div class="product-mes">
                   <p>{{scope.row.goods_name}}</p>
                   <p>{{scope.row.description}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column  prop="price"  label="价格"  width="100"></el-table-column>
              <el-table-column  prop="stock"  label="总库存"  width="100"></el-table-column>
              <el-table-column  prop="sales"  label="销量"  width="100"></el-table-column>

              
              <el-table-column prop="is_visible" label="是否上架" width="100">
                <template slot-scope="scope"> 
                  <el-switch
                  @change="onswitch4(scope.row.goods_id)"
                  v-model="scope.row.state"
                  active-color="#409EFF"
                  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column  prop="operation"  label="操作" >
                <template slot-scope="scope">
                  <el-button  type="primary" size="small">查看</el-button>
                  <el-button type="success" size="small" @click="on_edit(scope.row.goods_id)">编辑</el-button>
                  <el-button style="margin-left: 10px" type="danger" size="small" slot="reference" @click="del(scope.row.goods_id,scope.$index)">删除</el-button>

                </template>
              </el-table-column>
            </el-table>
          </template>
          <el-pagination style='padding-top: 60px;text-align: center;' background layout="prev, pager, next" 
            :total="page.total"
            :page-size="page.per_page" 
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        
    </div>
  </div>
</template>

<script>
import Release from '../../Release.vue'
import { Loading } from 'element-ui';
export default {
  name: 'List-b',
  data() {
      return {
        inpue:'',
        visible2: false,
        product:[], 
        addShow: false,
        eid:0,
        page:[]
      }
    }, 
    components: {
      Release,
    },
    methods:{
      handleCurrentChange(val) { 
        this.getProduct(val);
      },
      //修改商品信息
      on_edit(id){ 
        this.addShow = true;    
        this.eid =id;
      },
      back(){
        this.order_id = 0;
        this.addShow = false; 
      },
      getProduct (index=1) {  
        let loadingInstance = Loading.service({ fullscreen: true });
        var that = this;    
        this.req.get(that.API_PROXY + '/admin/get_products_down',{page:index,size:8})
        .then((res) =>{
          console.log(res);
          that.product = res.data.data;
          that.page = res.data;
          loadingInstance.close();

        });  
      },
      //删除商品
      del(id,index){
        var that = this;  
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.req.put(that.API_PROXY + '/admin/del_product',{id:id})
          .then((res) =>{    
            if(res.data == 1){ 
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              this.product.splice(index,1);
              return false;
            } else if(res.response.status==400){
              this.$alert(res.response.data.msg,'');
              return false;
            } else { 
              this.$message({
                showClose: true,
                message: '删除失败',
                type: 'error'
              }); 
              return false;
            }
          }); 
        })

      }, 
      //是否推荐
      onswitch2(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'goods',field:'is_recommend'})
        .then((res) =>{ 
          console.log(res);
        });  
      },
      //是否新品
      onswitch3(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'goods',field:'is_new'})
        .then((res) =>{ 
          console.log(res);
        });  
      },
      //是否上架
      onswitch4(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'goods',field:'state'})
        .then((res) =>{ 
          console.log(res);
        });  
      }
   
  }, 
  //vue生命函数
  mounted (){ 
    this.getProduct();//获取商品 
  } 
}
</script>
 
<style lang="less" scoped="">
.list{line-height: 30px;text-align:left;}
.list-head{padding-bottom: 10px;display: flex;}
.liat-head-02{font-size: 14px;padding-left: 10px }
.product-img{display: inline-block;width: 60px;}
.product-img img{height: 60px;width: 50px;}
.product-mes{display: inline-block;width: 300px;}
.product-mes p{line-height: 30px;overflow: hidden;height: 30px}
.order-back{line-height: 30px;padding-bottom: 10px;text-align: left;padding-left: 50px} 
</style>
