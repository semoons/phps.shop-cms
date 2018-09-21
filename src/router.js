import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import List from './views/product/List.vue'
import Release from './views/product/Release.vue'
import Category from './views/product/Category.vue'
import Spec from './views/product/Spec.vue'
import Order from './views/order/Order.vue'
import Pin from './views/order/Pin.vue'
import Customer from './views/order/Customer.vue'
import Member from './views/member/Member.vue'
import Rating from './views/member/Rating.vue'
import Ad from './views/web/Ad.vue'
import Set from './views/web/Set.vue'
import Article from './views/web/Article.vue'
import Login from './views/login/Login.vue'
import Details from './views/order/Details.vue'
import Message from './views/member/Message.vue'
import Manage from './views/web/Manage.vue'

Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/set',
      name: 'Set',
      component: Set
    },
    {
      path: '/ad',
      name: 'Ad',
      component: Ad
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/rating',
      name: 'Rating',
      component: Rating
    },
    {
      path: '/pin',
      name: 'Pin',
      component: Pin
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/spec',
      name: 'Spec',
      component: Spec
    },
    {
      path: '/release',
      name: 'Release',
      component: Release
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
