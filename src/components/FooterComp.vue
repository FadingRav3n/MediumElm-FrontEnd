<template>
  <div class="fixed bottom-none left-none w-full h-[3.5em] bg-[#f7f7f7] flex justify-around items-center">
    <div v-for="(item, idx) in footer_list" :key="idx" class="flex flex-col justify-center items-center"
      @click="changeTo(item.path)">
      <img :src="item.icon" alt="" class="w-[1.5em] h-[1.5em] m-b-[0.1em]" />
      <h3 class="text-[#666] text-size-[0.6em]">{{ item.name }}</h3>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import homeicon from '@/assets/icons/home.jpg'
import shoppingcarticon from '@/assets/icons/shoppingcart.jpg'
import meicon from '@/assets/icons/me.jpg'
import messageicon from '@/assets/icons/message.jpg'
import supermarketicon from '@/assets/icons/supermarket.jpg'
const footer_list = [
  {
    name: '首页',
    icon: homeicon,
    path: 'home',
  },
  {
    name: '全能超市',
    icon: supermarketicon,
    path: 'supermarket'
  },
  {
    name: '消息',
    icon: messageicon,
    path: 'message'
  },
  {
    name: '购物车',
    icon: shoppingcarticon,
    path: 'shoppingcart'
  },
  {
    name: '我的',
    icon: meicon,
    path: 'me'
  },
]
const router = useRouter()
const changeTo = (tar: string) => {
  router.push({
    name: tar
  })
}
</script>
<style scoped></style>
