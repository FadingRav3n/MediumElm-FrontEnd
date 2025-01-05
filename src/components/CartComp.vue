<template>
  <div class="w-full h-3.5em fixed left-0 bottom-0 bg-white flex items-center">
    <div v-if="props.cartItems.length === 0" class="h-full w-30%">
      <img src="../assets/icons/cart-gray.jpg" alt="" class="h-90% pl-0.5em">
    </div>
    <div v-else class="h-full w-30% relative">
      <div class="absolute h-1em w-1em top-5% right-0% b-rd-10em bg-red flex justify-center items-center text-white">
        <p class="text-0.3em">{{ totalQuantity }}</p>
      </div>
      <img src="../assets/icons/cart-color.png" alt="" class="h-90% pl-0.5em">
    </div>
    <div class="h-full w-full flex items-center flex-col">
      <h3 class="w-full">
        ￥{{ total ? total : 0 }}
      </h3>
      <p class="text-0.8em text-#666 w-full">另需配送费￥{{ props.deliveryFee ? props.deliveryFee : 0 }}</p>
    </div>
    <div class="w-40% box-border pr-0.5em h-60% flex justify-center items-center">
      <div class="bg-#666 text-white h-full w-full b-rd-2em flex justify-center items-center"
        v-if="total < props.deliveryStart">
        <h3 class="text-0.9em">
          ￥{{ props.deliveryStart ? props.deliveryStart : 0 }}起送
        </h3>
      </div>
      <div class="bg-blue text-white h-full w-full b-rd-2em flex justify-center items-center" v-else @click="openMask">
        <h3 class="text-0.9em">
          ￥{{ total }}
        </h3>
      </div>
    </div>
  </div>
  <div class=myDialog>
    <el-dialog v-model="isMaskVisible" title="提交订单" width="100%">
      <div class="h-80vh overflow-scroll scroll-unset">
        <div class="w-full ">
          <div class="flex">
            <h3 class="p-1em text-1em w-13%">地址</h3>
            <el-input v-model="address" style="width: 240px" placeholder="填写收货地址">
            </el-input>
          </div>
          <div class="bg-white b-radius=3xp">
            <div class="flex">
              <h3 class="p-1em text-1em">门牌号</h3>
              <el-input v-model="detail" style="width: 240px" placeholder="填写详细地址。例：1层102室">
              </el-input>
            </div>
            <div class="flex">
              <h3 class="p-1em text-1em">联系人</h3>
              <el-input v-model="realName" style="width: 240px" placeholder="填写收货人姓名">
              </el-input>
            </div>
            <h3 class="p-1em text-1em">送达时间</h3>
            <div class="flex justify-around w-full items-center">
              <div
                class="b-rd-10px b-blue b-1px b-solid text-blue w-50% flex justify-center items-center flex-col h-3em mr-0.5em">
                <p>
                  立即送出
                </p>
                <p>预计{{ formattedTime }}送达</p>
              </div>
              <div class="b-rd-10px bg-#ddd text-black w-50% flex justify-center items-center flex-col h-3em">
                <p>预约配送</p>
                <p>选择时间></p>
              </div>
            </div>
            <p class="text-blue text-1em mt-0.5em mb-0.5em">因配送距离较远，送达时间可能波动</p>
          </div>
        </div>
        <div class="shadow mb-0.5em">
          <div class="h-2em flex justify-start items-center pl-0.5em">{{ props.merchantName }}</div>
          <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
            <div v-for="(item_, idx) in cartItems" :key="idx" class="flex w-full ">
              <img :src="item_.icon" alt="" class="w-5em b-rd-2em">
              <div class="flex justify-around flex-col w-full pr-1em">
                <h2 class="text-0.9em">{{ item_.name }}</h2>
                <div class="flex justify-between items-center w-full">
                  <h2 class="text-0.9em">x{{ item_.quantity }}</h2>
                  <h2 class="text-1em text-black">￥{{ (parseFloat(item_.cost) * item_.quantity).toFixed(2) }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="pl-0.5em">
            <p class="text-black text-1.1em">配送费: ￥{{ props.deliveryFee }}</p>
          </div>
          <div class="text-black flex justify-end items-center pr-0.5em pb-1em">
            <h3>小计￥<span class="text-1.5em">{{ total + deliveryFee }}</span></h3>
          </div>
        </div>
        <div class="shadow flex justify-between">
          <div class="flex justify-center items-center flex-col w-5em pl-0.5em">
            <h3 class="mb-0.5em w-full flex justify-start h-2em items-center">支付宝</h3>
            <h3 class="w-full flex justify-start h-2em items-center">微信支付</h3>
          </div>
          <el-radio-group v-model="paymentMethod" class="flex flex-col pr-1em box-border items-center">
            <el-radio label="alipay" class="flex justify-start">支付宝支付</el-radio>
            <el-radio label="wechat">微信支付</el-radio>
          </el-radio-group>
        </div>
        <div class="h-5.5em"></div>

      </div>
      <div class="fixed bottom-0 left-0 w-full h-3.5em flex justify-end box-border pr-1em items-center z-100 bg-white">
        <div class="flex justify-center items-center pr-1em text-black">
          <h3>合计￥<span class="text-1.5em">{{ total + deliveryFee }}</span></h3>
        </div>
        <div class="bg-blue text-white h-80% w-30% b-rd-2em flex justify-center items-center box-border"
          @click="submitOrder">
          <h3 class="text-0.9em">
            确认提交
          </h3>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { get, post } from '@/auth/auth';
import { base_url } from '@/util/const';
import { watch, computed, ref, onMounted } from 'vue'
const emit = defineEmits<{
  (event: 'update-cart', cartItems: any[]): void;
}>();
const props = defineProps({
  cartItems: { type: Array, required: true },  // 接收父组件传递的购物车商品数据
  merchantId: { type: String, required: true },  // 当前商家 ID
  merchantName: { type: String, required: true },
  deliveryFee: { type: Number, required: true },
  deliveryStart: { type: Number, required: true }
})
const paymentMethod = ref('alipay')
const now = new Date();

now.setMinutes(now.getMinutes() + 45);
const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

watch(props, (newval) => {
  console.log(newval)
})
const total = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
});

const totalQuantity = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.quantity, 0);
});

const isMaskVisible = ref(false);

// 显示遮罩层
const openMask = () => {
  isMaskVisible.value = true;
};
const userid = ref()
const getUserId = async()=>{
  // console.log(sessionStorage.getItem('cur_user'))
  get(base_url+'/api/users/'+sessionStorage.getItem('cur_user'),(data)=>{
    userid.value = data.id
    console.log(userid.value)
  })
}

onMounted(async()=>{
  await getUserId()
})
const address = ref()
const detail = ref()
const realName = ref()
const submitOrder = async() => {
  const result = props.cartItems.map(item => ({
    mid: item.id,
    quantity: item.quantity
  }));

  console.log(result);
  console.log("ok")

  const finalresult = {
    uid: userid.value,
    mid: props.merchantId,
    address: address.value,
    detail: detail.value,
    realName: realName.value,
    total: total.value + props.deliveryFee,
    items: result
  }
  console.log('final_result',finalresult)
  post(base_url+'/api/orders',finalresult,(data)=>{
    console.log(data)
  })
  isMaskVisible.value = false
  sessionStorage.removeItem('cart_'+props.merchantId)
  updateCart()
}
const updateCart = () => {
  // 在这里触发父组件的 update-cart 事件
  emit('update-cart', props.cartItems);
};

</script>
<style scoped>
:deep(.el-dialog) {
  margin: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 85vh;
  border-top-right-radius: 1.5em;
  border-top-left-radius: 1.5em;
}

:deep(.el-radio) {
  margin: 0;
  display: flex;
  justify-content: flex-start;
  height: 2.5em;
}
</style>
