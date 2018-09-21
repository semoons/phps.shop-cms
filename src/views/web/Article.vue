<template>
  <div >
    <transition appear appear-active-class="animated fadeInLeft">
      <div class="article">
        <div class="list-head">
          <el-row>
              <el-button type="primary" size='small'  @click="dialogFormVisible = true">添加文章</el-button>
              <el-dialog title="" :visible.sync="dialogFormVisible" width="50%" center>
                <el-form :model="form"  >
                  <el-form-item label="文章标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" auto-complete="off"></el-input>
                  </el-form-item>   
                   <el-form-item label="文章标题" :label-width="formLabelWidth">
                     <el-input type="textarea" v-model="form.content" rows="10"></el-input>
                  </el-form-item>                                            
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="sub()">确 定</el-button>
                </div>
              </el-dialog> 
          </el-row>
        </div>
        <template>
          <el-table :data="list" border style="width: 100%">
            <el-table-column  type="index"  label="序号"  width="60"></el-table-column>
            <el-table-column  prop="title"  label="文章标题"  width="400"></el-table-column>
            <el-table-column  prop="author"  label="作者"  width="180"></el-table-column>
            <el-table-column  prop="create_time"  label="创建时间"  width="280"></el-table-column>
            <el-table-column prop="is_hidden" label="是否隐藏" width="100">
                <template slot-scope="scope"> 
                  <el-switch
                  @change="onswitch(scope.row.id)"
                  v-model="scope.row.is_hidden"
                  active-color="#409EFF"
                  inactive-color="#DCDFE6">
                  </el-switch>
                </template>
              </el-table-column>

            <el-table-column  prop="operation"  label="操作" >
              <template slot-scope="scope">
                <!-- <el-button @click="handleEdit(scope.row.id)" type="success" size="small">修改</el-button> -->
                <el-button style="margin-left: 10px" type="danger" size="small" slot="reference" @click="del(scope.row.id,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
          
      </div>   
    </transition>
  </div>
  
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: 'Article',
  data(){
    return{
        dialogFormVisible: false,
        form: {
          title: '',    
          content: '', 
        },
        formLabelWidth: '120px',
        list:[],
    }
  },
  methods:{
      sub(){
         var that = this;    
          this.req.post(that.API_PROXY + '/admin/add_article',that.form)
            .then((res) =>{   
              var res_code=res.status.toString(); 
              if(res_code.charAt(0) == 2){  
                that.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                that.dialogFormVisible = false;
                that.form.title='';
                that.form.content='';   
                that.getArticles();
              }else{
                that.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                });  
              }  
          });  
        
      },
      //获取所有文章
      getArticles(){
          var that = this;             
          let loadingInstance = Loading.service({ fullscreen: true });//显示加载 
          this.req.get(that.API_PROXY + '/newlist',{type:'cms'})
            .then((res) =>{          
              console.log(res.data);      
              loadingInstance.close();   //关闭加载 
              var res_code=res.status.toString(); 
              if(res_code.charAt(0) == 2){  
                that.list=res.data;
              }  
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
          this.req.put(that.API_PROXY + '/admin/del_article',{id:id})
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
       //是否隐藏
      onswitch(id){
        var that = this; 
        this.req.put(that.API_PROXY + '/admin/update',{id:id,db:'article',field:'is_hidden'})
        .then((res) =>{ 
          console.log(res);
        });  
      },
  },
  mounted(){
      this.getArticles();   
  }
}
</script>
 
<style lang="less" scoped="">
.article{line-height: 30px;text-align: left;}
.list-head{padding-bottom: 10px}
</style>
