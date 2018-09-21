<template>
  <div>
    <transition appear appear-active-class="animated fadeInLeft">
       <div class="order-details">
          <div class="details">
             <div class="details-l fl">
                <div class="details-l-01">
                   <div class="fl">订单信息</div>
                   <div class="fr"><span>担保交易</span></div>
                   <div class="clear"></div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">订单编号 ： </div>
                  <div class="details-l-02-r">{{details.order_num}}</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">订单类型 ： </div>
                  <div class="details-l-02-r">12332131312</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">付款方式 ： </div>
                  <div class="details-l-02-r">{{details.payment_type}}</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">买家 ： </div>
                  <div class="details-l-02-r">{{details.user_name}}</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">买家IP ： </div>
                  <div class="details-l-02-r">{{details.user_ip}}</div>
                </div>
                <hr style="height:1px;border:none;border-top:1px dashed #f0f0f0;" />
                <div class="details-l-02">
                  <div class="details-l-02-l">配送方式 ： </div>
                  <div class="details-l-02-r">12332131312</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">配送时间 ： </div>
                  <div class="details-l-02-r">12332131312</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l" >收货信息 ： </div>
                  <div class="details-l-02-r">{{details.receiver_name}},{{details.receiver_mobile}},{{details.receiver_province}}{{details.receiver_city}}{{details.receiver_district}}{{details.receiver_address}}</div>
                </div>
                <div class="details-l-02">
                  <div class="details-l-02-l">买家留言 ： </div>
                  <div class="details-l-02-r">12332131312</div>
                </div>
             </div>
             <div class="details-r fl">
                <div class="details-r-01">
                   <div class="details-r-01-l"><i class="el-icon-warning" ></i></div>
                   <div class="details-r-01-r">
                     <div class="details-r-01-r-01">订单状态：已关闭</div>
                     <div>
                        <el-row >
                          <el-button type="primary" size="small" @click="dialogFormVisible = true">备注</el-button>
                          <el-dialog title="" style='width: 80%' :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                              <el-form-item label="备注" :label-width="formLabelWidth" style='width: 80%'>
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                              </el-form-item>                              
                            </el-form>
                            <div slot="footer" class="dialog-footer" style='text-align: center'>
                              <el-button @click="dialogFormVisible = false">取 消</el-button>
                              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                          </el-dialog>
                          <el-button type="primary" size="small" style='margin-left: 10px'  @click="del(1,2)">删除订单</el-button>
                        </el-row>
                     </div>
                   </div>
                </div>
                <hr style=" height:2px;border:none;border-top:2px dotted #f0f0f0;" />
                <div class="details-r-02"> 
                    <ul class="">
                      
                      <li style="width: 180px">商品图</li>
                      <li style="width: 280px">商品</li>
                      <li style="width: 120px">价格</li>
                      <li style="width: 80px">数量</li>
                      <li style="width: 140px">调整金额（元）</li>
                      <li style="width: 120px">小计（元）</li>
                      <li style="width: 180px">配送状态</li>
                    </ul>
                    <ul class="">
                      
                      <li style="width: 180px">{{details.picture}}</li>
                      <li style="width: 280px;">{{details.goods_name | ellipsis}}</li>
                      <li style="width: 120px">{{details.goods_money}}</li>
                      <li style="width: 80px">{{details.num}}</li>
                      <li style="width: 140px"  @click="Form_price = true">
                        <el-row>
                          <el-button>{{details.pay_status}}</el-button>  
                        </el-row>
                      </li>
                      <el-dialog title="" style='width: 400px' :visible.sync="Form_price">
                        <el-form :model="form_price" style=''>
                          <el-form-item label=""  >
                            <el-input v-model="form.price" auto-complete="off"></el-input>
                          </el-form-item>                              
                        </el-form>
                        <div slot="footer" class="dialog-footer" style='text-align: center'>
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                      <li style="width: 120px">{{details.price}}</li>
                      <li style="width: 180px" @click="Form_shipping = true">
                        <el-row>
                          <el-button>配送状态</el-button>  
                        </el-row>
                      </li>
                      <el-dialog title="" style='80%' :visible.sync="Form_shipping">
                        <el-form :model="form_shipping" style=''>
                          <el-form-item label="1" :label-width="formLabelWidth" >
                            <el-input v-model="form.shipping" auto-complete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="2" :label-width="formLabelWidth" >
                            <el-input v-model="form.sname" auto-complete="off"></el-input>
                          </el-form-item>
                          <el-form-item label="3" :label-width="formLabelWidth" >
                            <el-input v-model="form.ship" auto-complete="off"></el-input>
                          </el-form-item>                              
                        </el-form>
                        <div slot="footer" class="dialog-footer" style='text-align: center'>
                          <el-button @click="dialogFormVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                    </ul>

                </div>
                <div class="details-r-03">商品总金额：¥{{details.price}}.实际需支付：<span>¥{{details.order_money}}</span>（含运费¥{{details.shipping_money}}）</div>
             </div>
             <div class="clear"></div>       
          </div>
          <div class="log">
             <div class="log-01">订单日志</div>
             <div class="log-02">操作备注： 12312312321312</div>
          </div>
        </div>
    </transition> 
  </div>
  
</template>

<script>
export default {
  name: 'Details',
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  },

  props:['order_id'],
   data() {
        return {
          details:[],
          list:[],
          mid:this.order_id,
          dialogFormVisible: false,
          form: {
            name: '',
           
          },
          Form_price:false,
          form_price:{
            price:'',
          },
          Form_shipping:false,
          form_shipping:{
            shipping:'',
            sname:'',
            ship:'',
          },
          formLabelWidth: '120px'
        }
      }, 
    methods:{
      post_details(){
        var that = this;
        this.req.post(that.API_PROXY + "/admin/get_order_one",{id:this.mid}).then((res) => {
            that.details = res.data;  //收藏返回的是商品和店铺
            that.list = res.data;
            
        })
      },
      //删除商品
      del(id,index){
        var that = this;  
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
        })

      }      
    }, 
    //vue生命函数
    mounted (){ 
      this.post_details();  
    } 
}
</script>
 
<style lang="less" scoped="">
.fl{float: left}
.fr{float: right}
.clear{clear: both;}

.details{border: 1px solid #e0e0e0;}
.details-l{border-right: 1px solid #f0f0f0;width: 20%; box-sizing: border-box;padding: 10px 8px}
.details-l-01{font-weight: bold;width: 100%;font-size: 14px;}
.details-l-01 span{font-weight:400; font-size: 10px;text-align: right;color: #ffa042;}
.details-l-02{font-size: 10px;color: #bebebe;line-height: 30px;}
.details-l-02-l{display:inline-block;width: 30%;text-align: right;vertical-align: top;}
.details-l-02-r{display:inline-block;width: 70%;}
.details-r-01{padding-bottom: 20px}
.details-r-01-r-01{padding-bottom: 10px; }
.details-r{width: 80%;box-sizing: border-box;padding: 15px 15px;}
.details-r-01-l{display:inline-block;vertical-align: top;}
.details-r-01-r{display:inline-block;padding-left: 10px;font-size: 12px;line-height: 30px;padding-bottom: 10px}
.details-r-02{padding-top: 15px; font-size: 14px}
.details-r-03{text-align: right;height: 60px;line-height: 60px; font-size: 14px;}
.details-r-03 span{color: red;}
.log{padding-top: 10px;}
.log-01{height: 40px;background-color: #f0f0f0;color: #8e8e8e;line-height: 40px;font-size: 12px;border-top: 1px solid #e0e0e0;border-bottom: 1px solid #e0e0e0;padding-left: 10px}
.log-02{height: 40px;color: #8e8e8e;line-height: 40px;font-size: 12px;border-bottom: 1px solid #e0e0e0;padding-left: 10px}
.details-r-02 ul{border-bottom: 1px solid #e0e0e0;line-height: 50px;}
.details-r-02 ul li{display:inline-block;}
</style>
