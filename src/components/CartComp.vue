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
      <div>
        <p>订单总金额: ￥{{ total }}</p>
        <p>配送费: ￥{{ props.deliveryFee }}</p>
      </div>
      <div class="fixed bottom-0 left-0 w-full h-3.5em flex justify-end box-border pr-1em">
        <div class="bg-blue text-white h-80% w-30% b-rd-2em flex justify-center items-center box-border" @click="submitOrder">
          <h3 class="text-0.9em">
            确认提交
          </h3>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { watch, computed, ref } from 'vue'
const props = defineProps({
  cartItems: { type: Array, required: true },  // 接收父组件传递的购物车商品数据
  merchantId: { type: String, required: true },  // 当前商家 ID
  deliveryFee: { type: Number, required: true },
  deliveryStart: { type: Number, required: true }
})

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

const submitOrder = ()=>{
  console.log("ok")
}
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
</style>
