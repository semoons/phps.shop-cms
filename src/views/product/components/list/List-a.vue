<template>
  <div class="list-a">
     <div>
        <div v-if="addShow" class="add-category "> 
          <div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
          <Release :eid='eid' @parent_show="parent_show"></Release> 
        </div>

        <div class="list" v-if="!addShow">
          <div class="list-head">
            <div class="liat-head-01">
              <el-row>
                <el-button type="primary" size='small' @click="on_add()">发布商品</el-button>  
              </el-row>
            </div>
            <div class="liat-head-02" style="padding-left:30px;">
              <el-input placeholder="商品名称" style='width: 98%' size='small' v-model="value"></el-input>
            </div>
            <div class="liat-head-03">
              <el-row>
                <el-button type="info" size='small' @click='serach'>搜索</el-button> 
                <el-button type="success" size='small' @click='all'>所有</el-button> 
              </el-row>
            </div>  
          </div>
          <template>
            <el-table :data="product"  border style="width: 100%">
               
              <el-table-column  type="index"  label="序号"  width="50"></el-table-column>
              <el-table-column  prop="goods_name"  label="商品名称"  width="380">
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
              <el-table-column prop="is_visible" label="是否热销" width="80">
                <template slot-scope="scope"> 
                  <el-switch  @change="onswitch(scope.row.goods_id)"  v-model="scope.row.is_hot"  active-color="#409EFF"  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="is_visible" label="是否推荐" width="80">
                <template slot-scope="scope"> 
                  <el-switch  @change="onswitch2(scope.row.goods_id)"  v-model="scope.row.is_recommend"  active-color="#409EFF"  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="is_visible" label="是否新品" width="80">
                <template slot-scope="scope"> 
                  <el-switch
                  @change="onswitch3(scope.row.goods_id)"
                  v-model="scope.row.is_new"
                  active-color="#409EFF"
                  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="is_visible" label="是否下架" width="80">
                <template slot-scope="scope"> 
                  <el-switch
                  @change="onswitch4(scope.row.goods_id)"
                  v-model="scope.row.state"
                  active-color="#DCDFE6"
                  inactive-color="#F56C6C">
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
        value:'',
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
      serach(){
        this.getProduct(1,this.value);

      },
      all(){  
        this.getProduct();
        this.value='';
      },
      handleCurrentChange(val) { 
        this.getProduct(val);
      },
      //添加商品信息
      on_add(){ 
        this.addShow = true;    
        this.eid = 0;
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
      getProduct (index=1,keywords='') {  
        let loadingInstance = Loading.service({ fullscreen: true });
        var that = this;    
        this.req.get(that.API_PROXY + '/admin/get_products',{page:index,size:8,keywords:keywords})
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
            var res_code=res.status.toString(); //返回结果状态码转字符串取第一位数
            if(res_code.charAt(0) == 2){ 
              that.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              that.product.splice(index,1); 
            } else { 
              that.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });  
            } 
             
          }); 
        })
      }, 
      //是否热销
      onswitch(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'goods',field:'is_hot'})
        .then((res) =>{ 
          console.log(res);
        });  
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
      },
      //监听子组件release的事件,修改成功则返回列表页
      parent_show(){
        this.addShow = false; 
        this.eid = 0;
        this.getProduct();//获取商品 
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
.product-mes{display: inline-block;width: 220px;}
.product-mes p{line-height: 30px;overflow: hidden;height: 30px}
.order-back{line-height: 30px;padding-bottom: 10px;text-align: left;padding-left: 50px} 
</style>
