<template>
  <div class="h-100vh w-100vw">
    <header class="flex w-full justify-start flex-col items-center bg-[linear-gradient(180deg,dodgerblue,#f4f8fb)]">
      <div class="w-full flex justify-between items-center h-2.5em">
        <div class="w-60% box-border pl-1em" @click="back">
          <el-icon><i>
              <ArrowLeft class="text-1.3em" />
            </i></el-icon>
        </div>
        <div class="w-40% flex justify-around items-center box-border pr-1em">
          <el-icon><i>
              <Search class="text-1.3em"></Search>
            </i></el-icon>
          <el-icon><i>
              <Message class="text-1.3em"></Message>
            </i></el-icon>
          <el-icon><i>
              <Star class="text-1.3em"></Star>
            </i></el-icon>
          <el-icon><i>
              <More class="text-1.3em"></More>
            </i></el-icon>
        </div>
      </div>
      <div class="w-full h-8.2em 100% box-border pl-1em pr-1em ">
        <div class="border-rd-1em shadow-md h-8em w-full box-border p-1em bg-white">
          <div class="flex justify-between">
            <div class="w-60%">
              <h2 class="text-1.3em mb-0.3em">{{ merchantInfo?.name }}</h2>
              <div class="flex justify-start">
                <div class="w-4em">
                  <p class="text-0.8em text-#666">评分</p>
                  <h3 class="text-0.8em">{{ merchantInfo?.rate }}</h3>
                </div>
                <div class="w-4em">
                  <p class="text-0.8em text-#666">月售</p>
                  <h3 class="text-0.8em">{{ merchantInfo?.soldout }}</h3>
                </div>
                <div class="w-5em">
                  <p class="text-0.8em text-#666">蜂鸟准时达</p>
                  <h3 class="text-0.8em">{{ merchantInfo?.distance }}km
                  </h3>
                </div>
              </div>
            </div>
            <div class="w-30% flex justify-end">
              <img :src="merchantInfo?.banner" alt="" class="w-4em h-4em">
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="outer-tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="点餐" name="first">
          <div class="inner-tab">
            <el-tabs :tab-position="tabPosition" class="h-66vh" type="border-card" v-model="merchandiseactiveName">
              <el-tab-pane v-for="(item, idx) in menuInfo" :key="idx" :label="item.title" :name="item.id">
                <div v-for="(item_, idx) in merchaniseData" :key="idx"
                  class="w-full h-6em flex justify-around items-center shadow">
                  <div class="w-35% h-full flex justify-center items-center">
                    <img :src="item_?.icon" alt="" class="w-full">
                  </div>
                  <div class="w-65% h-full box-border pt-0.5em">
                    <h3 class="text-1em">{{ item_?.name }}</h3>
                    <p class="text-#666 text-0.8em box-border pt-1em">已售{{ item_?.soldout }}</p>
                    <div class="flex w-full justify-between items-center">
                      <div class="flex justify-center items-center">
                        <h3 class="text-0.7em text-red">￥</h3>
                        <h2 class="text-0.9em text-red">{{ item_?.cost }}</h2>
                      </div>
                      <div v-if="!cartItems.some(cartItem => cartItem.id === item_.id)">
                        <div class="box-border pr-1em z-10" @click="addToCart(item_)">
                          <el-icon><i class="text-blue text-1.1em">
                              <Plus></Plus>
                            </i></el-icon>
                        </div>
                      </div>
                      <div v-else class="w-40%">
                        <div class="box-border pr-1em z-10 flex justify-around items-center">
                          <el-icon @click="delFromCart(item_)"><i class="text-blue text-1.0em">
                              <Minus></Minus>
                            </i></el-icon>
                          <p class="text-0.8em ml-0.3em mr-0.3em">{{ getQuantity(item_.id) }}</p>
                          <el-icon @click="addToCart(item_)"><i class="text-blue text-1.0em">
                              <Plus></Plus>
                            </i></el-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>

        </el-tab-pane>
        <el-tab-pane label="评价" name="second"></el-tab-pane>
        <el-tab-pane label="商家" name="third">
          {{ merchantInfo?.address }}
        </el-tab-pane>
      </el-tabs>
    </div>
    <CartComp :cartItems="cartItems" :deliveryFee="merchantInfo?.deliveryFee" :deliveryStart="merchantInfo?.deliveryStart"
      :merchantId="merchantInfo?.id"></CartComp>
  </div>
</template>
<script lang="ts" setup>
import { base_url } from '@/util/const';
import { ArrowLeft, Search, Message, Star, More, Plus, Minus } from '@element-plus/icons-vue';
import axios from 'axios';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type TabsInstance } from 'element-plus'
import CartComp from '@/components/CartComp.vue';
import { getQuery,get } from '@/auth/auth';
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const merchandiseactiveName = ref('')
onMounted(async () => {
  await getMerchantInfo()
  console.log(merchantInfo.value)
  await getMenus()
  console.log('menuinfo',menuInfo.value)
  merchandiseactiveName.value = menuInfo.value[0].id
  console.log(merchandiseactiveName.value)
  await fetchMerchandises(merchandiseactiveName.value);
  console.log(merchaniseData.value)
})
const activeName = ref('first')

const props = defineProps({
  mid: { type: String, required: true }
})
const merchaniseData = ref()

const merchantInfo = ref()
const getMerchantInfo = async () => {
  get(base_url+`/api/merchants/${props.mid}`,
    (data)=>{
      console.log(data)
      merchantInfo.value = data
    }
  )
  // await axios.get(base_url + `/api/merchants/${props.mid}`).then((resp) => {
  //   console.log(resp.data)
  //   merchantInfo.value = resp.data
  // })
}

const menuInfo = ref()
const getMenus = async () => {
  get(base_url + `/api/menus/${props.mid}`,(data)=>{
    menuInfo.value = data
  })
}

const router = useRouter()
const back = () => {
  router.back()
}
const fetchMerchandises = async (id: string) => {
  console.log(id)
  get(base_url + `/api/merchandises/${id}`,(data)=>{
    merchaniseData.value = data
  })
}

watch(merchandiseactiveName, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await fetchMerchandises(newVal); // 每次切换菜单时获取对应商品
  }
});


const cartItems = ref(JSON.parse(sessionStorage.getItem(`cart_${props.mid}`) || '[]'));

const saveCartItems = () => {
  console.log("Saving cart items...");
  // 在保存购物车之前，检查是否有空的购物车
  if (cartItems.value.length === 0) {
    // 如果该商家的购物车为空，删除该商家对应的 sessionStorage 数据
    sessionStorage.removeItem(`cart_${props.mid}`);
  } else {
    // 否则保存购物车数据
    sessionStorage.setItem(`cart_${props.mid}`, JSON.stringify(cartItems.value));
  }
  console.log("Cart saved", JSON.parse(sessionStorage.getItem(`cart_${props.mid}`) || '[]'));
};

const addToCart = (item: any) => {
  const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({ ...item, quantity: 1 });
  }
  saveCartItems();
};

const delFromCart = (item: any) => {
  const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      // 如果商品数量为1，直接从购物车中移除该商品
      cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id);
    }
  }
  saveCartItems(); // 更新sessionStorage
};

const getQuantity = (id: string) => {
  const item = cartItems.value.find(item => item.id === id);
  return item ? item.quantity : 0; // 如果找不到商品，则返回 0
};
</script>
<style scoped>
.inner-tab :deep(.el-tabs__item) {
  height: 4em;
  border: none;
}

.inner-tab :deep(.el-tabs__content) {
  padding: 0;
}

.outer-tab {
  width: 100%;
  box-sizing: border-box;
}
</style>
