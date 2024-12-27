<template>
  <div class="w-full h-3.5em fixed left-0 bottom-0 bg-white flex items-center">
    <img src="../assets/icons/cart-gray.jpg" alt="" class="h-90% pl-0.5em">
    <div class="h-full w-full flex items-center flex-col">
      <h3 class="w-full">
        ￥{{ total?total:0 }}
      </h3>
      <p class="text-0.8em text-#666 w-full">另需配送费￥{{ props.deliveryFee?props.deliveryFee:0 }}</p>
    </div>
    <div class="w-40% box-border pr-0.5em h-60% flex justify-center items-center">
      <div class="bg-#666 text-white h-full w-full b-rd-2em flex justify-center items-center" v-if="cartItems.length===0">
        <h3 class="text-0.9em">
          ￥{{ props.deliveryStart?props.deliveryStart:0 }}起送
        </h3>
      </div>
      <div class="bg-blue text-white h-full w-full b-rd-2em flex justify-center items-center" v-else>
        <h3 class="text-0.9em">
          ￥{{ total }}
        </h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {watch,computed} from 'vue'
const props = defineProps({
  cartItems: { type: Array, required: true },  // 接收父组件传递的购物车商品数据
  merchantId: { type: String, required: true },  // 当前商家 ID
  deliveryFee:{type:Number,required:true},
  deliveryStart:{type:Number,required:true}
})

watch(props,(newval)=>{
  console.log(newval)
})
const total = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
});
</script>
<style scoped></style>
