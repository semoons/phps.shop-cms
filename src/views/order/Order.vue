<template>
	<div>
		<transition appear appear-active-class="animated fadeInLeft"> 
           <div class="order">

				<div v-if="addShow" class="add-category "> 

					<div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
					<order-details :order_id='this.order_id'></order-details> 
				</div>

				<template v-if="!addShow">
				    <div class="list-head">
			            
			            <div class="liat-head-02">
			              订单号：<el-input placeholder="请输入内容" style='width: 70%' size='small' v-model="value"></el-input>
			            </div>
			            <div class="liat-head-03">
			              <el-row>
			                <el-button type="primary" size='small' @click='serach'>搜索</el-button> 
			                <el-button type="success" size='small' @click='all'>所有</el-button> 
			              </el-row>
			            </div>  
			        </div> 
					<el-table :data="order" border style="width: 100%">
						<el-table-column  type="index"  label="序号"  width="50"></el-table-column>
					    <el-table-column prop="order_num" label="订单号" width="180"></el-table-column> 
						<el-table-column prop="" label="商品清单" width="280">
                            <template slot-scope="scope">
				              <div >
				               <p>{{scope.row.goods_name | ellipsis}}</p>
				              
				              </div>
				            </template>
						</el-table-column>
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
					<el-pagination style='padding-top: 60px;text-align: center;' background layout="prev, pager, next" :total="page.total"  :page-size="page.per_page"  @current-change="handleCurrentChange">
			        </el-pagination>
				</template>
				
			</div>
		</transition>
	</div>
	
</template>

<script>
	import OrderDetails from './Details.vue'

	export default {
		name: 'Order',
		filters: {
		    ellipsis (value) {
		      if (!value) return ''
		      if (value.length > 18) {
		        return value.slice(0,18) + '...'
		      }
		      return value
		    }
		  }, 
		data() {
			return { 
				value:'',
				visible2: false,
				order:[],
				addShow: false, //设置要显示的页面部分默认为false，隐藏 
				checkdDistributor: null,
				order_id:0,
				page:[]  
		    }
		},
		components: {
			OrderDetails,
		}, 
		methods:{
			serach(){
		        this.post_order(1,this.value);

		    },
		    all(){  
		        this.post_order();
		        this.value='';
		    },
			handleCurrentChange(val) { 
		        this.post_order(val);
		    },
			handleClick(row) {
				console.log(row);
			},
			post_order(index=1,keywords=''){
				var that = this;
				this.req.post(that.API_PROXY + "/admin/get_order_all",{page:index,size:8,keywords:keywords}).then((res) => {
			    	that.order = res.data.data;  //收藏返回的是商品和店铺
			    	that.page = res.data;
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
.order{line-height: 30px;text-align:left;}
.order-back{margin-bottom: 10px;}
.list-head{padding-bottom: 10px;display: flex;}
.liat-head-02{font-size: 14px;padding-left: 10px }
</style>