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
        <el-icon><i>
            <Right />
          </i></el-icon>
      </div>
    </div>
    <div class="w-full h-20em bg-white border-rd-0.5em flex justify-center items-center flex-col" v-if="Object.keys(carts).length === 0">
      <img src="../assets/cart-banner.jpg" alt="" class="w-12em h-9em">
      <h3 class="text-1em fw-500 m-0.3em">购物车竟然空空如也</h3>
      <p class="text-0.6em text-#777">快去加购喜欢的商品吧</p>
    </div>
    <div v-else class="flex justify-center items-center">
      <div v-for="(item, idx) in carts" :key="idx" class="w-full flex flex-col items-center shadow">
        <div class="w-full box-border pl-1em pr-1em pt-1em pb-0.5em">
          <div class="w-full flex justify-between items-center">
            <h3 class="text-1em">{{ item.name }}</h3>
            <img src="../assets/icons/trash.svg" alt="" class="w-1.1em" @click="delFromCart(idx)">
          </div>
        </div>
        <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
          <div v-for="(item_,idx) in item.items " :key="idx" class="flex w-full">
            <img :src="item_.icon" alt="" class="w-5em b-rd-2em">
            <div class="flex justify-around flex-col w-full pr-1em">
              <h2 class="text-0.9em">{{ item_.name }}</h2>
              <div class="flex justify-between items-center w-full">
                <h2 class="text-0.9em">￥{{(parseFloat(item_.cost) * item_.quantity).toFixed(2)}}</h2>
                <h2 class="text-0.9em b-1px b-solid b-rd-5px b-#666 p-0.1em">x{{ item_.quantity }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { onBeforeMount, ref } from 'vue';
import { base_url } from '@/util/const';
import { ArrowRight } from '@element-plus/icons-vue';
const router = useRouter()
const toSuperMarket = () => {
  router.push({
    name: 'supermarket'
  })
}

const getCartsFromSession = () => {
  const carts = {};
  // 遍历 sessionStorage 的所有键
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    // 检查键是否以 'cart' 开头
    if (key && key.startsWith('cart')) {
      const cartData = sessionStorage.getItem(key);
      if (cartData) {
        try {
          carts[key] = JSON.parse(cartData); // 解析并存储到 carts 对象中
        } catch (e) {
          console.error(`无法解析 ${key} 的数据`, e);
        }
      }
    }
  }
  return carts;
};
import axios from 'axios';
// 存储商家购物车信息
const carts = ref(getCartsFromSession());
console.log(carts.value)
onBeforeMount(async () => {
  await getAllMerchantInfo();
})

const getAllMerchantInfo = async () => {
  const allCarts = getCartsFromSession(); // 获取存储在 session 中的购物车数据
  const cartsWithDetails = {};  // 用于存储合并后的购物车数据

  console.log('All Carts:', allCarts);

  // 遍历所有商家的购物车数据
  for (const merchantId in allCarts) {
    const cart = allCarts[merchantId]; // 获取当前商家的购物车数据
    console.log('Cart Data:', cart);

    try {
      // 假设商家信息通过 merchantId 获取（这里我们去掉 'cart_' 前缀）
      const response = await axios.get(`${base_url}/api/merchants/${merchantId.substring(5)}`);
      const merchantInfo = response.data;

      // 提取商品数据并转换为数组
      const items = Object.entries(cart).filter(([key]) => !['name', 'distance'].includes(key)) // 排除掉非商品信息字段
        .map(([key, item]) => item); // 提取商品信息

      // 合并商家信息与购物车数据
      cartsWithDetails[merchantId] = {
        name: merchantInfo.name,
        distance: merchantInfo.distance,
        items: items
      };
    } catch (error) {
      console.error('获取商家信息失败', error);
    }
  }

  // 将合并后的购物车数据保存到 carts 中
  carts.value = cartsWithDetails;

  console.log('Merged Carts:', carts.value);
};

const delFromCart = async(id)=>{
  console.log(id)
  sessionStorage.removeItem(`${id}`)
  await getAllMerchantInfo()
}
</script>
<style scoped></style>
