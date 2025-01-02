<template>
  <div class="w-screen h-screen bg-[#fffffd]">
    <header
      class="w-full h-[4.5em] pos-fixed pos-left-none pos-top-none bg-[linear-gradient(180deg,dodgerblue,#f4f8fb,#fffffd)]">
      <div class="h-[2.5em] w-full flex justify-around items-center">
        <div class="w-[60%] flex justify-start items-center box-border p-l-[1em]">
          <h2 class="text-[#666] text-size-[1.2em]">常点</h2>
          <h2 class="box-border p-[0.4em] text-size-[1em] font-100">|</h2>
          <h2 class="text-[#000] text-size-[1.2em]">推荐</h2>
        </div>
        <div class="w-[60%] box-border pr-0.5em">
          <p class="text-size-[0.9em] flex justify-center items-center">云南大学呈贡校区楸苑<el-icon><i><ArrowDown></ArrowDown></i></el-icon> </p>
        </div>
      </div>
      <div class="w-full h-[2.5em] flex justify-center items-center">
        <div
          class="h-[2em] b-2 border-rd-[1em] border-solid b-blue bg-white m-l-[0.5em] m-r-[0.5em] flex justify-between w-full">
          <div>
            <input type="text" class="border-rd-3em b-none h-90% w-100% ">
          </div>
          <div
            class="bg-blue border-rd-[1em] w-[4.5em] m-[3px] text-center text-white text-size-[0.8em] flex justify-center items-center">
            <p>搜索</p>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full h-full mt-[5em]">
      <img src="../assets/home-banner.jpg" alt="" class="w-full">
      <div class="w-full flex flex-basis-5em flex-wrap">
        <div v-for="(item, idx) in categories" :key="idx"
          class="w-20% h-4em flex justify-center items-center flex-col bg-#fffffd">
          <img :src="item.icon" alt="" class="h-2em w-2em">
          <p class="text-0.9em">{{ item.title }}</p>
        </div>
      </div>
      <div class="bg-[#f4fafb]">
        <div class="w-100% box-border pl-0.5em pr-0.5em">
          <img src="../assets/newcomer-banner.jpg" alt="" class="w-100%">
        </div>
      </div>
      <div class="w-full box-border pl-1em pr-1em bg-[#f4fafb]">
        <div v-for="(item, idx) in merchantList" :key="idx"
          class="w-100% h-9em border-rd-10px bg-white shadow-md box-border p-1em flex justify-center items-center mb-0.5em" @click="toMerchantInfo(item.id)">
          <div class="w-38% h-100% flex justify-center items-center mr-0.5em">
            <img :src="item.icon" alt="" class="w-100%">
          </div>
          <div class="w-60% h-full">
            <div class="flex justify-between items-center">
              <h3 class="text-0.9em">
                {{ item.name }}
              </h3>
              <img src="../assets/icons/more.svg" alt="" class="w-0.8em">
            </div>
            <div class="flex justify-between">
              <div class="flex mb-0.3em mt-0.2em">
                <h3 class="text-orange text-0.8em mr-0.5em">{{ item.rate }}分</h3>
                <p class="text-#333 text-0.8em">月售{{ item.soldout }}+</p>
              </div>
              <div class="flex">
                <p class="text-0.8em text-#333">
                  {{ item.distance }}km
                </p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-#333 text-0.7em">起送￥{{ item.deliveryStart }}</p>
              <div class="text-blue text-0.7em b-blue b-1px b-solid b-rd-0.3em">
                蜂鸟准时达
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-3.4em"></div>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import FooterComp from '@/components/FooterComp.vue';
import hbxc from '@/assets/icons/hbxc.jpg'
import zfmd from '@/assets/icons/zfmd.jpg'
import zlxc from '@/assets/icons/zlxc.jpg'
import smcw from '@/assets/icons/smcw.jpg'
import tpyp from '@/assets/icons/tpyp.jpg'
import kfg from '@/assets/icons/kfg.jpg'
import pzbh from '@/assets/icons/pzbh.jpg'
import ygjz from '@/assets/icons/ygjz.jpg'
import jcc from '@/assets/icons/jcc.jpg'
import csbl from '@/assets/icons/csbl.jpg'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { base_url } from '@/util/const';
const categories = ref([
  {
    title: '汉堡西餐',
    icon: hbxc
  },
  {
    title: '超市便利',
    icon: csbl
  },
  {
    title: '粥粉面点',
    icon: zfmd
  },
  {
    title: '炸卤小吃',
    icon: zlxc
  },
  {
    title: '数码潮玩',
    icon: smcw
  },
  {
    title: '甜品饮品',
    icon: tpyp
  },
  {
    title: '咖啡馆',
    icon: kfg
  },
  {
    title: '品质百货',
    icon: pzbh
  },
  {
    title: '阳光酒庄',
    icon: ygjz
  },
  {
    title: '家常菜',
    icon: jcc
  },
])

const merchantList = ref()
onMounted(async () => {
  await getAllMechant()
})
const getAllMechant = async () => {
  axios.get(base_url+'/api/merchants', {
    params: {
      pageNum: 1,
      pageSize: 2
    }
  }).then((resp) => {
    merchantList.value = resp.data.list
    console.log(merchantList.value)
  })
}

const router = useRouter()
const toMerchantInfo = (mid:string)=>{
  router.push({
    name:'merchant',
    params:{
      mid:mid
    }
  })
}
</script>
<style scoped></style>
