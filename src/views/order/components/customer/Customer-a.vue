<template>
  <div class="">
       <div v-if="addShow" class="add-category "> 

			<div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
			<order-details :order_id='this.order_id'></order-details> 
		</div>

		<template v-if="!addShow"> 
			<el-table :data="order" border style="width: 100%"> 
				<el-table-column prop="goods_name" label="商品清单" width="280"></el-table-column>
				<el-table-column prop="order_money" label="订单价格" width="90"></el-table-column>
				<el-table-column prop="address" label="收货信息" width="280">
					<template slot-scope="scope">
		              <div class="product-mes">
		               <p>{{scope.row.receiver_name}}</p>
		               <p>{{scope.row.receiver_mobile}}</p>
		               <p>{{scope.row.receiver_province}}{{scope.row.receiver_city}}{{scope.row.receiver_country}}{{scope.row.receiver_address}}</p>
		              </div>
		            </template>
				</el-table-column>
				<el-table-column prop="user_name" label="买家" width="80"></el-table-column>
				<el-table-column prop="stock" label="交易状态" width="80"></el-table-column>
				<el-table-column prop="sales" label="配送方式" width="180"></el-table-column>
				<el-table-column prop="operation" label="操作">
					<template slot-scope="scope">
						<el-button @click="handleEdit(scope.row.order_id)" type="primary" size="small">查看</el-button>
						<el-button type="success" size="small"  >编辑</el-button>						
                        <el-button style="margin-left: 10px" type="danger" size="small" slot="reference" @click="del(scope.row.order_id,scope.$index)">删除</el-button>						 
					</template>
				</el-table-column>
			</el-table>
		</template>
  </div>
</template>

<script>
import OrderDetails from '../../Details.vue'
export default {
  name: 'Customer-a',
  data() {
			return { 
				visible2: false,
				order:[],
				addShow: false, //设置要显示的页面部分默认为false，隐藏 
				checkdDistributor: null,
				order_id:0  
		    }
		},
		components: {
			OrderDetails,
		}, 
		methods:{
			handleClick(row) {
				console.log(row);
			},
			post_order(){
				var that = this;
				this.req.post(that.API_PROXY + "/admin/get_order_all").then((res) => {
			    	that.order = res.data;  //收藏返回的是商品和店铺
			    })
			},
			handleEdit(row){  
		      this.addShow = true; // addshow为要显示的页面  
		      this.order_id = row;
		  },
		  back(){
		  	this.order_id = 0;
		  	this.addShow = false; 
		  },
		  //删除订单
	      del(id,index){
				var that = this;	
				this.$confirm('是否删除?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		         this.req.put(that.API_PROXY + '/admin/del_order',{id:id})
		  			.then((res) =>{    
		                if(res.data == 1){ 
							this.$message({
					          showClose: true,
					          message: '删除成功',
					          type: 'success'
					        });
					        this.order.splice(index,1);
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
		},
	  	//vue生命函数
	  	mounted (){ 
	  		this.post_order();  
	  	} 
	 
   
 
}
</script>
 
<style lang="less" scoped="">
.order-back{margin-bottom: 10px;} 
</style>
