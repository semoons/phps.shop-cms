<template>
  <div class="manage">
    <div class="list" >
      <div class="list-head">   
          <el-row>
            <el-button type="primary" size='small' @click="dialogFormVisible = true">添加用户</el-button>
            <el-dialog title="" :visible.sync="dialogFormVisible" style='width: 60%;'>
              <el-form :model="form" >
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属用户组" :label-width="formLabelWidth">
                  <el-select v-model="form.gid" placeholder="请选择用户组">
                    <el-option label="管理员组" value="1" selected = "selected"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input v-model="form.description" type="textarea" :rows="2" placeholder="请输入内容" >
                  </el-input>
                </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="register()">确 定</el-button>
              </div>
            </el-dialog> 
          </el-row>
      </div>
      <template>
         <el-table :data="list" border style="width: 100%">
          <el-table-column  type="index"  label="序号"  width="50"></el-table-column>
    	  	<el-table-column  prop="username"  label="名称"  width="180"></el-table-column>
    	    <el-table-column  prop="create_time"  label="创建时间"  width="180"></el-table-column>
    	    <el-table-column  prop="group_id"  label="openid"  width="280"></el-table-column>
    	    <el-table-column  prop="ip"  label="ID"  width="80"></el-table-column>
    	     <el-table-column prop="state" label="是否禁用" width="100">
                <template slot-scope="scope"> 
                  <el-switch
                  @change="onswitch(scope.row.id)"
                  v-model="scope.row.state"
                  active-color="#409EFF"
                  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>
    	    <el-table-column  prop="operation"  label="操作" >
            <template slot-scope="scope"> 
      			 <el-button style="margin-left: 10px" type="danger" size="small" slot="reference" @click="del(scope.row.id,scope.$index)">删除</el-button> 	
    	      </template>
    	    </el-table-column>
    	  </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage-a',
  data(){
    return{
      dialogFormVisible: false,
      form: {
        username: '',
        password:'',
        gid: '',
        description:'',     
      },
      formLabelWidth: '120px',
      list:[]
    }
  },
  methods:{
    //新增管理员
    register(){ 
        var that=this;
        this.req.post(that.API_PROXY + '/admin/add_admin',that.form)
          .then((res) =>{      
             if(res.data == 1){ 
                that.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });  
                that.dialogFormVisible=false;
                that.getUser();
              } else {
                that.$message({
                  showClose: true,
                  message: '添加失败',
                  type: 'error'
                });  
              }
          }); 
    },
    //获取所有管理员
    getUser(){ 
       var that=this;
       this.req.post(that.API_PROXY + '/admin/get_admin')
          .then((res) =>{      
            that.list=res.data;
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
          this.req.put(that.API_PROXY + '/admin/del_admin',{id:id})
          .then((res) =>{    
            var res_code=res.status.toString(); //返回结果状态码转字符串取第一位数
            if(res_code.charAt(0) == 2){ 
              that.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
              that.list.splice(index,1); 
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
       //是否禁用
      onswitch(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'admins',field:'state'})
        .then((res) =>{ 
          console.log(res);
        });  
      },
  },
  mounted (){
     this.getUser();
  }
}
</script>
 
<style lang="less" scoped="">
.manage{line-height: 30px;text-align: left;} 
.list-head{padding-bottom: 10px}
</style>
