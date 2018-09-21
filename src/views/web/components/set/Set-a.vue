<template>
	<div class="">
	    <el-form ref="form"  label-width="100px">

		  <el-form-item v-for="(item,index) in list" :label="item.desc"  
		  style='width: 70%'>
		    <el-input v-model="item.value" ></el-input>
		  </el-form-item> 
		  <el-form-item style='width: 80%'>
		    <el-button type="primary" @click="onSubmit">提交修改</el-button>
		     
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'Set-a', 
	data() {
      return {
      	list:[], 
      }
    },
    methods:{ 
	  	onSubmit() {
	    	var that = this;  
            this.req.post(that.API_PROXY + '/admin/edit_config',that.list)
            .then((res) =>{   
              var res_code=res.status.toString(); 
              if(res_code.charAt(0) == 2){  
                that.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });  
              }else{
                that.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                });  
              }  
            });  
	    },
	    post_config(){
	      var that = this;
	      this.req.post(that.API_PROXY + "/admin/get_config",{type:1})
	        .then((res) => {
	          that.list = res.data;  //收藏返回的是商品和店铺   
	        })
	    } 		 
	}, 
	//vue生命函数
	mounted (){ 
		this.post_config();  
	} 
}
</script>
 
<style lang="less">
 .el-form-item{
 	margin-bottom: 12px !important;
 }
</style>
