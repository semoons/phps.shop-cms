<template>
  <div id="home"> 
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu  default-active="2" class="el-menu-vertical-demo" unique-opened="true" 
            background-color="#545c64" text-color="#fff" active-text-color="#fff"
            >
            <el-menu-item index="2" @click="main">              
              <span slot="title" >首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">               
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"  @click="pro1">商品列表</el-menu-item>
                <el-menu-item index="1-2" @click="pro2">商品发布</el-menu-item>
                <el-menu-item index="1-3" @click="pro3">商品分类</el-menu-item>
                <!-- <el-menu-item index="1-4" @click="pro4">商品规格</el-menu-item> -->
              </el-menu-item-group>              
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">               
                <span>订单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="ord1">订单列表</el-menu-item>
                <el-menu-item index="3-2" @click="ord2">团单列表</el-menu-item>
                <el-menu-item index="3-3" @click="ord3">售后服务</el-menu-item>
              </el-menu-item-group>              
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">               
                <span>会员</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="mem1">会员列表</el-menu-item>
                <!-- <el-menu-item index="4-2" @click="mem2">会员等级</el-menu-item> -->
              </el-menu-item-group>              
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">               
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="web1">广告管理</el-menu-item>
                <el-menu-item index="5-2" @click="web2">文章管理</el-menu-item>
                <el-menu-item index="5-3" @click="web3">站点设置</el-menu-item>
                <el-menu-item index="5-4" @click="web4">管理组</el-menu-item>
              </el-menu-item-group>              
            </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
    <el-container>
      <el-header style='border-bottom: 1px solid #e0e0e0;'><home-header></home-header></el-header>
      <el-main style='background-color: #ffffff;'><component :is="comview"/></el-main>
    </el-container>
  </el-container>

</div>
</template>

<script>
// @ is an alias to /src
import HomeHeader from './components/Header.vue'
import HomeMain from './components/Main.vue'
import HomeList from '../product/List.vue'
import HomeRelease from '../product/Release.vue'
import HomeCategory from '../product/Category.vue'
import HomeSpec from '../product/Spec.vue'
import OrderOrder from '../order/Order.vue'
import OrderPin from '../order/Pin.vue'
import OrderCustomer from '../order/Customer.vue'
import MemberMember from '../member/Member.vue'
import MemberRating from '../member/Rating.vue'
import WebArticle from '../web/Article.vue'
import WebSet from '../web/Set.vue'
import WebAd from '../web/Ad.vue'
import WebManage from '../web/Manage.vue'


export default {
  name: 'home',
  data() {
    return {
      comview: 'HomeMain'
    }
  },
  components: {
    HomeHeader,
    HomeMain,
    HomeList,
    HomeRelease,
    HomeCategory,
    HomeSpec,
    OrderOrder,
    OrderCustomer,
    OrderPin,
    MemberMember,
    MemberRating,
    WebArticle,
    WebSet,
    WebAd,
    WebManage,
  },
  methods:{
    main(){
      this.comview = 'HomeMain'
    },
    web1(){
      this.comview = 'WebAd'
    },
    web2(){
      this.comview = 'WebArticle'
    },
    web3(){
      this.comview = 'WebSet'
    },
    web4(){
      this.comview = 'WebManage'
    },
    mem1(){
      this.comview = 'MemberMember'
    },
    mem2(){
      this.comview = 'MemberRating'
    },
    ord1(){
      this.comview = 'OrderOrder'
    },
    ord2(){
      this.comview = 'OrderPin'
    },
    ord3(){
      this.comview = 'OrderCustomer'
    },
    pro1(){
      this.comview = 'HomeList'
    },
    pro2(){
      this.comview = 'HomeRelease'
    },
    pro3(){
      this.comview = 'HomeCategory'
    },
    pro4(){
      this.comview = 'HomeSpec'
    }, 
    login(){ 
       this.req.get(this.API_PROXY + '/admin/check_login')
          .then((res) =>{
            if(res.status != 200){ 
                localStorage.clear();
            }
          });
    }
  },
  mounted (){   
    this.login(); 
  }
}

</script>
<style lang="less">
#home{ 
  .el-menu-item{
    background:#434A50 !important;
  } 
  .el-menu-item.is-active{
    color:#409EFF !important;
  }
  .home{ 
      height:100%;
      overflow:hidden; 
      background:#fff;
  }
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
}

</style>
