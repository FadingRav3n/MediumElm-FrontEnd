<template>
  <div class="w-full h-full box-border">
    <header class="w-full  bg-[linear-gradient(90deg,#e3edf6,#f4f8fb)] box-border pl-1em pr-1em">
      <div class="flex justify-between items-center w-full h-4em">
        <div class="flex items-center">
          <img src="" alt="">
          <p>{{ maskedUsername }}</p>
        </div>
        <el-dropdown>
          <el-icon><i class="text-1.5em">
              <Setting></Setting>
            </i></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="startlogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        class="bg-#222a41 border-rd-tr-1em border-rd-tl-1em h-3.5em w-full flex justify-between items-center box-border pr-0.5em pl-0.5em">
        <h2 class="text-1.1em text-#5c6574">白银会员 | <span class="text-white text-0.9em">一月会员特权已到账</span></h2>
        <div class="h-40% flex justify-center items-center b-rd-1em bg-white p-0.1em w-3.5em text-0.9em">去解锁</div>
      </div>
    </header>
    <div class="w-full bg-[#f4f8fb] b-rd-tr-1em b-rd-tl-12em p-1em box-border">
      <div class="w-full flex mb-1em">
        <div class="w-33.3% flex flex-col justify-center items-center">
          <img src="../assets/icons/sp3.jpg" alt="" class="h-2em">
          <h3 class="text-1em mb-0.3em">
            超级吃货卡
          </h3>
          <p class="text-0.6em text-#666">
            无门槛大额红包
          </p>
        </div>
        <div class="w-33.3% flex flex-col justify-center items-center">
          <img src="../assets/icons/sp1.jpg" alt="" class="h-2em">
          <h3 class="text-1em mb-0.3em">
            吃货豆
          </h3>
          <p class="text-0.6em text-#666">
            <span class="text-red">0</span>
            豆可用
          </p>
        </div>
        <div class="w-33.3% flex flex-col justify-center items-center">
          <img src="../assets/icons/sp2.jpg" alt="" class="h-2em">
          <h3 class="text-1em mb-0.3em">
            空包卡券
          </h3>
          <p class="text-0.6em text-#666">
            <span class="text-red">4</span>
            张红包可用
          </p>
        </div>
      </div>
      <div class="b-rd-1em bg-white mb-0.5em pb-1em box-border" @click="changeToAllOrders">
        <h3 class="text-1em p-1em box-border">我的订单</h3>
        <div class="flex justify-around items-center">
          <div class="flex justify-center flex-col items-center">
            <img src="../assets/icons/dd1.jpg" alt="" class="w-2em">
            <p>全部</p>
          </div>
          <div class="flex justify-center flex-col items-center">
            <img src="../assets/icons/dd2.jpg" alt="" class="w-2em">
            <p>进行中</p>
          </div>
          <div class="flex justify-center flex-col items-center">
            <img src="../assets/icons/dd3.jpg" alt="" class="w-2em">
            <p>待评价</p>
          </div>
          <div class="flex justify-center flex-col items-center">
            <img src="../assets/icons/dd4.jpg" alt="" class="w-2em">
            <p>退款</p>
          </div>
        </div>
      </div>
      <div class="b-rd-1em bg-white mb-0.5em">
        <h3 class="text-1em p-1em box-border">我的钱包</h3>
        <div class="flex justify-around items-center pb-1em">
          <div class="flex justify-center items-center flex-col">
            <h3 class="text-1.1em mb-0.3em">19.6<span class="text-0.8em">万</span></h3>
            <p class="text-0.8em">借钱</p>
          </div>
          <div class="flex justify-center items-center flex-col">
            <h3 class="text-1.1em mb-0.3em">420<span class="text-0.8em">元</span></h3>
            <p class="text-0.8em">外卖红包</p>
          </div>
          <div class="flex justify-center items-center flex-col">
            <h3 class="text-1.1em mb-0.3em">1<span class="text-0.8em">笔</span></h3>
            <p class="text-0.8em">笔笔返现</p>
          </div>
          <div class="flex justify-center items-center flex-col">
            <h3 class="text-1.1em mb-0.3em">10<span class="text-0.8em">元</span></h3>
            <p class="text-0.8em">银行福利</p>
          </div>
        </div>
      </div>
      <div class="b-rd-1em bg-white mb-0.5em pb-1em">
        <h3 class="text-1em p-1em box-border">互动中心</h3>
        <div class="flex flex-wrap justify-around items-center">
          <div v-for="(item, idx) in hdzx" :key="idx" class="w-25% flex flex-col justify-center items-center">
            <img :src="item.icon" alt="" class="w-3em">
            <p class="text-0.8em">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts" setup>
import FooterComp from '@/components/FooterComp.vue';
import { ref } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import mg1 from '@/assets/icons/mg1.jpg';
import mg2 from '@/assets/icons/mg2.jpg';
import mg3 from '@/assets/icons/mg3.jpg';
import mg4 from '@/assets/icons/mg4.jpg';
import mg5 from '@/assets/icons/mg5.jpg';
import mg6 from '@/assets/icons/mg6.jpg';
import mg7 from '@/assets/icons/mg7.jpg';
import mg8 from '@/assets/icons/mg8.jpg';
import { logout } from '@/auth/auth';
import { ElMessage } from 'element-plus';
import router from '@/router';
const username = sessionStorage.getItem('cur_user')
let maskedUsername:string|null;
if (username && username.length >= 11) {
  maskedUsername = username.substring(0, 3) + '*'.repeat(4) + username.substring(7);
  console.log(maskedUsername);
} else {
  maskedUsername = username
  console.log(username);
}
const hdzx = [
  {
    name: '游乐园',
    icon: mg1
  },
  {
    name: '天天赚现金',
    icon: mg2
  },
  {
    name: '天天夺宝',
    icon: mg3
  },
  {
    name: '天天抽奖',
    icon: mg4
  },
  {
    name: '饭搭子',
    icon: mg5
  },
  {
    name: '斗地主赢话费',
    icon: mg6
  },
  {
    name: '美味天天连',
    icon: mg7
  },
  {
    name: '梦幻小院',
    icon: mg8
  }
]

const startlogout = () => {
  logout(() => {
    ElMessage({
      message: '登出成功',
      type: 'success'
    })
    sessionStorage.clear();
    router.push({
      name: 'login'
    })
  }, () => {
    ElMessage(
      {
        message: '登出失败',
        type: 'warning'
      }
    )
  })
}
const changeToAllOrders = ()=>{
  router.push({
    name:'all_order'
  })
}
</script>
<style scoped></style>
