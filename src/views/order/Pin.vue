<template>
	<div>
		<transition appear appear-active-class="animated fadeInLeft"> 
            <div class="pin">
            	<div v-if="addShow" class="add-category "> 

					<div class="order-back"><el-button type="primary" size="small" @click="back">返回</el-button></div> 
					<pin-details :order_id='this.id'></pin-details> 
				</div>
			    <template v-if="!addShow">
				    <el-table :data="pin" border style="width: 100%">
					    <el-table-column prop="goods_name" label="商品信息" width="180">
					    	<template slot-scope="scope">
				              <div >
				               <p>{{scope.row.goods_name | ellipsis}}</p>
				              
				              </div>
				            </template>
					    </el-table-column>
					    <el-table-column prop="" label="商品清单" width="180">
					    </el-table-column>
					    <el-table-column prop="item_people" label="拼团人数" width="90">
					    </el-table-column>
					    <el-table-column prop="orders.order_num" label="订单编号" width="180">
					    	<template slot-scope="scope">
				              <div >
				               <p>{{scope.row.orders[0].order_num }}</p>
				              
				              </div>
				            </template>
					    </el-table-column>
					    <el-table-column  prop="price" label="商品单价" width="180">
					    </el-table-column>
					    <el-table-column prop="orders.order_money"  label="订单价钱"  width="180">
					    </el-table-column>
					    <el-table-column  prop="operation" label="操作" >
					      <template slot-scope="scope">
					        <el-button @click="handleEdit(scope.row.id)" type="primary" size="small">查看</el-button>
					        <el-button type="success" size="small">编辑</el-button> 
							 
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
import PinDetails from './components/pin/Pin-details.vue'
export default {
  name: 'Pin',
  filters: {
		    ellipsis (value) {
		      if (!value) return ''
		      if (value.length > 12) {
		        return value.slice(0,12) + '...'
		      }
		      return value
		    }
		  }, 
   data() {
	      return {
	        page:[] ,
	        pin:[],
	        addShow: false, //设置要显示的页面部分默认为false，隐藏 

	      }
	    },
		components: {
			PinDetails,
		}, 
	methods:{
	  	handleCurrentChange(val) { 
		        this.post_pin(val);
		    },
	  	post_pin(index=1){
	  		var that = this;
  	  	this.req.post(that.API_PROXY + "/admin/get_order_item_all",{page:index,size:8}).then((res) => {
    		    that.pin = res.data.data;  //收藏返回的是商品和店铺
    		    that.page = res.data;
    		})
  	  },
		handleEdit(row){  
	      this.addShow = true; // addshow为要显示的页面  
	      this.id = row;
	  },
	  back(){
	  	this.order_id = 0;
	  	this.addShow = false; 
	  }
  	
	}, 
	  //vue生命函数
	mounted (){ 
	  	this.post_pin();  
	} 
}
</script>
 
<style lang="less" scoped="">
 .pin{line-height: 30px;text-align:left;}
 .order-back{margin-bottom: 10px;}
</style>
