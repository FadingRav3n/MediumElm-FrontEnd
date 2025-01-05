<template>
  <div class="h-100vh w-100vw">
    <header class="flex w-full justify-start flex-col items-center fixed top-0 left-0 bg-white z-100">
      <div class="w-full flex justify-start items-center h-2.5em">
        <div class="box-border pl-1em justify-start pr-0.5em pt-0.5em flex-col items-center" @click="back">
          <el-icon><i>
              <ArrowLeft class="text-1.3em text-black" />
            </i></el-icon>
        </div>
        <h3 class="flex justify-center items-center">订单信息</h3>
      </div>
    </header>
    <div class="box-border pl-1em pr-1em mt-2.5em">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="flex justify-center items-center flex-col">
            <div v-for="(item, idx) in allOrders" :key="idx" class="w-full flex flex-col items-center shadow bg-white">
              <!-- here -->
              <div class="w-full box-border pl-1em pr-1em pt-1em pb-0.5em">
                <div class="w-full flex justify-between items-center">
                  <div class="flex items-center">
                    <img :src="item.merchant.icon" alt="" class="w-2em">
                    <h3 class="text-1em ml-0.5em">{{ item.merchant.name }}</h3>
                  </div>
                  <div>
                    <p v-if="item.status == 0" class="text-0.9em">等待支付</p>
                    <p v-if="item.status == 1" class="text-0.9em">已完成</p>
                    <p v-if="item.status == 2" class="text-0.9em">已取消</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
                <div v-for="(item_, idx) in item.items " :key="idx" class="flex w-full ">
                  <img :src="item_.merchandise.icon" alt="" class="w-5em b-rd-2em">
                  <div class="flex justify-around flex-col w-full pr-1em">
                    <h2 class="text-0.9em">{{ item_.merchandise.name }}</h2>
                    <div class="flex justify-between items-center w-full">
                      <h2 class="text-0.9em">￥{{ (parseFloat(item_.merchandise.cost) * item_.quantity).toFixed(2) }}
                      </h2>
                      <h2 class="text-0.9em b-1px b-solid b-rd-5px b-#666 p-0.1em">x{{ item_.quantity }}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-full items-center pb-1em pl-1em pr-1em box-border">
                <h3 class="text-1em pr-1em">总价：￥{{ item.total }}</h3>
                <div v-if="item.status == 0">
                  <el-button @click="cancel(item.id)">取消</el-button>
                  <el-button @click="pay(item.id, item.total)" type=primary>支付</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未支付" name="second">
          <div class="flex justify-center items-center flex-col">
            <div v-for="(item, idx) in waitingOrders" :key="idx"
              class="w-full flex flex-col items-center shadow bg-white">
              <!-- here -->
              <div class="w-full box-border pl-1em pr-1em pt-1em pb-0.5em">
                <div class="w-full flex justify-between items-center">
                  <div class="flex items-center">
                    <img :src="item.merchant.icon" alt="" class="w-2em">
                    <h3 class="text-1em ml-0.5em">{{ item.merchant.name }}</h3>
                  </div>
                  <div>
                    <p v-if="item.status == 0" class="text-0.9em">等待支付</p>
                    <p v-if="item.status == 1" class="text-0.9em">已完成</p>
                    <p v-if="item.status == 2" class="text-0.9em">已取消</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
                <div v-for="(item_, idx) in item.items " :key="idx" class="flex w-full ">
                  <img :src="item_.merchandise.icon" alt="" class="w-5em b-rd-2em">
                  <div class="flex justify-around flex-col w-full pr-1em">
                    <h2 class="text-0.9em">{{ item_.merchandise.name }}</h2>
                    <div class="flex justify-between items-center w-full">
                      <h2 class="text-0.9em">￥{{ (parseFloat(item_.merchandise.cost) * item_.quantity).toFixed(2) }}
                      </h2>
                      <h2 class="text-0.9em b-1px b-solid b-rd-5px b-#666 p-0.1em">x{{ item_.quantity }}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-full items-center pb-1em pl-1em pr-1em box-border">
                <h3 class="text-1em pr-1em">总价：￥{{ item.total }}</h3>
                <div v-if="item.status == 0">
                  <el-button @click="cancel(item.id)">取消</el-button>
                  <el-button @click="pay(item.id, item.total)" type=primary>支付</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="fourth">
          <div class="flex justify-center items-center flex-col">
            <div v-for="(item, idx) in paidOrders" :key="idx" class="w-full flex flex-col items-center shadow bg-white">
              <!-- here -->
              <div class="w-full box-border pl-1em pr-1em pt-1em pb-0.5em">
                <div class="w-full flex justify-between items-center">
                  <div class="flex items-center">
                    <img :src="item.merchant.icon" alt="" class="w-2em">
                    <h3 class="text-1em ml-0.5em">{{ item.merchant.name }}</h3>
                  </div>
                  <div>
                    <p v-if="item.status == 0" class="text-0.9em">等待支付</p>
                    <p v-if="item.status == 1" class="text-0.9em">已完成</p>
                    <p v-if="item.status == 2" class="text-0.9em">已取消</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
                <div v-for="(item_, idx) in item.items " :key="idx" class="flex w-full ">
                  <img :src="item_.merchandise.icon" alt="" class="w-5em b-rd-2em">
                  <div class="flex justify-around flex-col w-full pr-1em">
                    <h2 class="text-0.9em">{{ item_.merchandise.name }}</h2>
                    <div class="flex justify-between items-center w-full">
                      <h2 class="text-0.9em">￥{{ (parseFloat(item_.merchandise.cost) * item_.quantity).toFixed(2) }}
                      </h2>
                      <h2 class="text-0.9em b-1px b-solid b-rd-5px b-#666 p-0.1em">x{{ item_.quantity }}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-full items-center pb-1em pl-1em pr-1em box-border">
                <h3 class="text-1em pr-1em">总价：￥{{ item.total }}</h3>
                <div v-if="item.status == 0">
                  <el-button @click="cancel(item.id)">取消</el-button>
                  <el-button @click="pay(item.id, item.total)" type=primary>支付</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已取消" name="third">
          <div class="flex justify-center items-center flex-col">
            <div v-for="(item, idx) in declinedOrders" :key="idx"
              class="w-full flex flex-col items-center shadow bg-white">
              <!-- here -->
              <div class="w-full box-border pl-1em pr-1em pt-1em pb-0.5em">
                <div class="w-full flex justify-between items-center">
                  <div class="flex items-center">
                    <img :src="item.merchant.icon" alt="" class="w-2em">
                    <h3 class="text-1em ml-0.5em">{{ item.merchant.name }}</h3>
                  </div>
                  <div>
                    <p v-if="item.status == 0" class="text-0.9em">等待支付</p>
                    <p v-if="item.status == 1" class="text-0.9em">已完成</p>
                    <p v-if="item.status == 2" class="text-0.9em">已取消</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex justify-center items-center flex-col pb-1em">
                <div v-for="(item_, idx) in item.items " :key="idx" class="flex w-full ">
                  <img :src="item_.merchandise.icon" alt="" class="w-5em b-rd-2em">
                  <div class="flex justify-around flex-col w-full pr-1em">
                    <h2 class="text-0.9em">{{ item_.merchandise.name }}</h2>
                    <div class="flex justify-between items-center w-full">
                      <h2 class="text-0.9em">￥{{ (parseFloat(item_.merchandise.cost) * item_.quantity).toFixed(2) }}
                      </h2>
                      <h2 class="text-0.9em b-1px b-solid b-rd-5px b-#666 p-0.1em">x{{ item_.quantity }}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-between w-full items-center pb-1em pl-1em pr-1em box-border">
                <h3 class="text-1em pr-1em">总价：￥{{ item.total }}</h3>
                <div v-if="item.status == 0">
                  <el-button @click="cancel(item.id)">取消</el-button>
                  <el-button @click="pay(item.id, item.total)" type=primary>支付</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="选择支付方式">
    <el-radio-group v-model="paymentMethod" class="flex flex-col pr-1em box-border items-center">
      <el-radio label="alipay" class="flex justify-start">支付宝支付</el-radio>
      <el-radio label="wechat">微信支付</el-radio>
      <el-button @click="startpay" class="w-full">支付</el-button>
    </el-radio-group>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { get, put } from '@/auth/auth';
import { base_url } from '@/util/const';
const activeName = ref('first')
const router = useRouter()
const back = () => {
  router.back();
}
onMounted(async () => {
  await getAllOrders()
  await getAllWaitingOrders()
  await getAllPaidOrders()
  await getAllDeclinedOrders()
})
const allOrders = ref([])
const waitingOrders = ref([])
const paidOrders = ref([])
const declinedOrders = ref([])
const getAllOrders = async () => {
  get(base_url + '/api/orders', (data) => {
    allOrders.value = data
    console.log(data)
  })
}
const getAllWaitingOrders = async () => {
  get(base_url + '/api/orders/status/0', (data) => {
    waitingOrders.value = data
    console.log(data)
  })
}
const getAllPaidOrders = async () => {
  get(base_url + '/api/orders/status/1', (data) => {
    paidOrders.value = data
    console.log(data)
  })
}
const getAllDeclinedOrders = async () => {
  get(base_url + '/api/orders/status/2', (data) => {
    declinedOrders.value = data
    console.log(data)
  })
}
const dialogVisible = ref(false)
const thisOid = ref()
const orderTotal = ref(0)
const pay = (oid, total) => {
  console.log('oid', oid)
  thisOid.value = oid
  orderTotal.value = total
  dialogVisible.value = true;
}
const cancel = async (oid) => {
  console.log('oid', oid)
  put(base_url + `/api/orders/${oid}`, { id: oid, status: 2 }, (data) => {
    console.log(data)
  })
  await getAllOrders()
  await getAllWaitingOrders()
  await getAllPaidOrders()
  await getAllDeclinedOrders()
}
const paymentMethod = ref('alipay')
const startpay = async () => {
  console.log(paymentMethod.value)
  console.log(thisOid.value)
  put(base_url + `/api/orders/${thisOid.value}/${sessionStorage.getItem('cur_user')}`, { id: thisOid.value, status: 1, total: orderTotal.value, payType: paymentMethod.value == 'alipay' ? 0 : 1 }, (data) => {
    console.log(data)
  })
  dialogVisible.value=false
  await getAllOrders()
  await getAllWaitingOrders()
  await getAllPaidOrders()
  await getAllDeclinedOrders()
}
</script>
<style scoped></style>
