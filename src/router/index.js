import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '../store'
import {
  Toast
} from 'vant'
const Home = () => import('../views/home/Home.vue')
const Categroy = () => import('../views/category/Category.vue')
const Detail = () => import('../views/detail/Detail.vue')
const User = () => import('../views/user/User.vue')
const Shopcart = () => import('../views/shopcart/Shopcart.vue')
const Register = () => import('../views/user/Register.vue')
const Login = () => import('../views/user/Login.vue')
const Pay = () => import('../components/common/Pay/pay.vue')
const Address = () => import('../views/user/Address.vue')
const AddressEdit = () => import('../views/user/AddressEdit.vue')
const createOrder = () => import('../views/order/createOrder.vue')
const orderList = () => import('../views/order/OrderList.vue')
const orderDetail = () => import('../views/order/OrderDetail.vue')
const About = () => import('../components/common/About/About.vue')
const Collect = () => import('../views/user/collect.vue')
const Setting = ()=>import('../views/setting/setting.vue')
const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '少鹏商城'
    }
  },
  {
    path: '/',
    name: 'defaultHome',
    component: Home,
    meta: {
      title: '少鹏商城'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Categroy,
    meta: {
      title: '商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: Collect,
    meta: {
      title: '收藏',
      isAuthRequried: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      title: '个人中心',
      isAuthRequried: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {
      title: '用户设置',
      isAuthRequried: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta: {
      title: '购物车',
      isAuthRequried: true
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    meta: {
      title: '支付',
      isAuthRequried: true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: '地址',
      isAuthRequried: true
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: Collect,
    meta: {
      title: '收藏',
      isAuthRequried: true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      title: '修改地址',
      isAuthRequried: true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: createOrder,
    meta: {
      title: '生成订单',
      isAuthRequried: true
    }
  },
  {
    path: '/order',
    name: 'orderList',
    component: orderList,
    meta: {
      title: '订单列表',
      isAuthRequried: true
    }
  },
  {
    path: '/orderdetail',
    name: 'orderDetail',
    component: orderDetail,
    meta: {
      title: '订单详情',
      isAuthRequried: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  //如果没有登录去登录
  if (to.meta.isAuthRequried && store.state.user.isLogin === false) {
    Toast.fail('你还没有登录,请先登录!');
    setTimeout(() => {
      next('/login');
    }, 500)
  } else {
    store.dispatch('updateCart');
    next();
  }
})
export default router