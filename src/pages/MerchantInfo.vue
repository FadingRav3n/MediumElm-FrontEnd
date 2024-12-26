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
              <h2 class="text-1.3em">{{ merchantInfo.name }}</h2>
              <div class="flex">
                <div>
                  <p>评分</p>
                  <h3>{{ merchantInfo.rate }}</h3>
                </div>
                <div>
                  <p>月售</p>
                  <h3>{{ merchantInfo.soldout }}</h3>
                </div>
                <div>
                  <p>蜂鸟准时达</p>
                  <h3></h3>
                </div>
              </div>
            </div>
            <div class="w-30% flex justify-end">
              <img :src="merchantInfo.banner" alt="" class="w-4em h-4em">
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="w-full 100% box-border">
      <el-tabs v-model="activeName" class="pl-0.5em pr-0.5em">
        <el-tab-pane label="点餐" name="first">
          <el-tabs :tab-position="tabPosition" class="h-66vh" type="border-card" v-model="merchandiseactiveName">
            <el-tab-pane v-for="(item,idx) in menuInfo" :key="idx" :label="item.title" :name="item.id">
              <div v-for="(item_,idx) in merchaniseData" :key="idx" class="w-full h-6em flex justify-around items-center shadow">
                <div class="w-35% h-full flex justify-center items-center">
                  <img :src="item_.icon" alt="" class="w-full">
                </div>
                <div class="w-65% h-full box-border pt-0.5em">
                  <h3 class="text-1em">{{ item_.name }}</h3>
                  <p class="text-#666 text-0.8em box-border pt-1em">已售{{ item_.soldout }}</p>
                  <div class="flex w-full justify-between items-center">
                    <div class="flex justify-center items-center">
                      <h3 class="text-0.7em text-red">￥</h3>
                      <h2 class="text-0.9em text-red">{{ item_.cost }}</h2>
                    </div>
                    <div class="box-border pr-1em">
                      <el-icon><i class="text-blue text-1.1em"><CirclePlusFilled></CirclePlusFilled></i></el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>
        <el-tab-pane label="评价" name="second"></el-tab-pane>
        <el-tab-pane label="商家" name="third">
          {{ merchantInfo.address }}
        </el-tab-pane>
      </el-tabs>
    </div>
    <CartComp></CartComp>
  </div>
</template>
<script lang="ts" setup>
import { base_url } from '@/util/const';
import { ArrowLeft, Search, Message, Star, More,CirclePlusFilled } from '@element-plus/icons-vue';
import axios from 'axios';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { TabsInstance } from 'element-plus'
import CartComp from '@/components/CartComp.vue';
const tabPosition = ref<TabsInstance['tabPosition']>('left')
onBeforeMount(async () => {
  await getMerchantInfo()
  await getMenus()
  merchandiseactiveName.value = menuInfo.value[0].id
  await fetchMerchandises(merchandiseactiveName.value);
})
const activeName = ref('first')
const merchandiseactiveName = ref('')

const props = defineProps({
  mid: { type: String, required: true }
})
const merchaniseData = ref()

const merchantInfo = ref()
const getMerchantInfo = async () => {
  await axios.get(base_url + `/api/merchants/${props.mid}`).then((resp) => {
    console.log(resp.data)
    merchantInfo.value = resp.data
  })
}

const menuInfo = ref()
const getMenus = async () => {
  await axios.get(base_url + `/api/menus/${props.mid}`).then((resp) => {
    console.log(resp.data)
    menuInfo.value = resp.data
  })
}

const router = useRouter()
const back = () => {
  router.back()
}
const fetchMerchandises = async(id:string)=>{
  await axios.get(base_url+`/api/merchandises/${id}`).then((resp)=>{
    merchaniseData.value = resp.data
  })
}

watch(merchandiseactiveName, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    await fetchMerchandises(newVal); // 每次切换菜单时获取对应商品
  }
});
</script>
<style scoped>
</style>
