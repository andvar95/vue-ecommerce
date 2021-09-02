import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserAuth from '../views/UserAuth.vue';
import CreateUser from '../views/CreateUser.vue';
import SingleProduct from "../views/SingleProduct.vue"; 
import Profile from "../views/Profile.vue";
import Shops from "../views/Shops.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import AdminUser from "../views/AdminUser.vue";

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'UserAuth',
    component:UserAuth
  },{
    path:'/register',
    name:'CreateUser',
    component:CreateUser
  },
  {
    path:'/product/:id',
    name:'SingleProduct',
    component:SingleProduct
  },{
    path:'/profile',
    name:'Profile',
    component:Profile
  },
  {
    path:'/cart',
    name:'Cart',
    component:Cart
  },
  {
    path:'/shops',
    name:'Shops',
    component:Shops
  },
  {
    path:'/product',
    name:'Product',
    component:Product
  },
  {
    path:'/adminuser',
    name:'AdminUser',
    component:AdminUser
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
