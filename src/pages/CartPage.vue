<template>
  <div class="w-full h-full box-border pl-1em pr-1em">
    <header class="box-border pt-0.5em flex items-center mb-1em">
      <h2 class="text-size-[1.3em] pr-0.5em">购物车</h2>
      <p class="text-1em">云南大学呈贡校区秋苑</p>
    </header>
    <div class="flex justify-center items-center mb-0.8em">
      <div class="w-50% h-2em border-rd-0.5em bg-white flex justify-center items-center mr-0.5em">
        <img src="../assets/icons/oftenbuy.jpg" alt="" class="w-1.1em h-1.1em">
        <h3 class="text-0.7em">我常买</h3>
      </div>
      <div class="w-50% h-2em border-rd-0.5em bg-white flex justify-center items-center">
        <img src="../assets/icons/supermarket-mini.jpg" alt="" class="w-1.1em h-1.1em">
        <h3 class="text-0.7em" @click="toSuperMarket()">万能超市 ></h3>
        <el-icon><i><Right/></i></el-icon>
      </div>
    </div>
    <div class="w-full h-20em bg-white border-rd-0.5em flex justify-center items-center flex-col">
      <img src="../assets/cart-banner.jpg" alt="" class="w-12em h-9em">
      <h3 class="text-1em fw-500 m-0.3em">购物车竟然空空如也</h3>
      <p class="text-0.6em text-#777">快去加购喜欢的商品吧</p>
    </div>
    <div class="w-full h-3em flex justify-center items-center">
      <div class="bg-[linear-gradient(90deg,#ddd,#999)] w-20% h-2px mr-0.5em"></div>
      <img src="../assets/icons/oftenbuy.jpg" alt="" class="w-1.1em h-1.1em">
      <h3 class="text-0.7em">我常买</h3>
      <div class="bg-[linear-gradient(270deg,#ddd,#999)] w-20% h-2px ml-0.5em"></div>
    </div>
    <div class="flex justify-center items-center">
      <p class="text-0.6em text-#777">您在云南大学呈贡校区楸苑附近还没有常购门店哦</p>
    </div>
    <div class="w-full h-3em flex justify-center items-center">
      <div class="bg-[linear-gradient(90deg,#ddd,#999)] w-20% h-2px mr-0.5em"></div>
      <h3 class="text-0.7em">新人专享</h3>
      <div class="bg-[linear-gradient(270deg,#ddd,#999)] w-20% h-2px ml-0.5em"></div>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import FooterComp from '@/components/FooterComp.vue';
const router = useRouter()
const toSuperMarket = ()=>{
  router.push({
    name:'supermarket'
  })
}
</script>
<style scoped>
</style>
