import AdminPage from "@/pages/AdminPage.vue";
import CartPage from "@/pages/CartPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MenuInfo from "@/pages/MenuInfo.vue";
import MePage from "@/pages/MePage.vue";
import MerchaniseInfo from "@/pages/MerchandiseInfo.vue";
import MerchantInfo from "@/pages/MerchantInfo.vue";
import MessagePage from "@/pages/MessagePage.vue";
import SupermarketPage from "@/pages/SupermarketPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { unauthorized } from "@/auth/auth";
import TagInfo from "@/pages/TagInfo.vue";
import AllOrders from "@/pages/AllOrders.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/home',
      component: HomePage
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    },
    {
      path: '/message',
      name: 'message',
      component: MessagePage
    },
    {
      path:'/supermarket',
      name:'supermarket',
      component:SupermarketPage
    },
    {
      path:'/shoppingcart',
      name:'shoppingcart',
      component:CartPage
    },
    {
      path:'/me',
      name:'me',
      component:MePage
    },
    {
      path:'/merchant/:mid',
      name:'merchant',
      component: MerchantInfo,
      props: route => ({mid:route.params.mid})
    },
    {
      path:'/admin',
      name:'admin',
      component:AdminPage
    },
    {
      path:'/menu/:id',
      name:'menu',
      component:MenuInfo,
      props: route => ({ id:route.params.id})
    },
    {
      path:'/merchanise/:id',
      name:'merchanise',
      component:MerchaniseInfo,
      props: route => ({ id:route.params.id})
    },
    {
      path:'/tag/:id',
      name:'tag',
      component:TagInfo,
      props: route => ({ id:route.params.id})
    },
    {
      path:'/all_order',
      name:'all_order',
      component:AllOrders
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isUnauthorized = unauthorized();
  if (to.name === 'login' && !isUnauthorized) {
    next('/home');
    return;
  }
  if (isUnauthorized && to.name !== 'login') {
    next('/login');
    return;
  }
  if((to.name==='admin' || to.name==='menu' || to.name==='merchandise') && sessionStorage.getItem('cur_user_role')=='user'){
    next('/home')
    return
  }
  next();
});

export default router
