<template>
  <div class="bg-white w-100vw h-100vh">
    <div class="flex items-center p-0.5em box-border justify-between">
      <div class="flex justify-center items-center">
        <div @click="back()" class="w-1.5em">
          <el-icon><i><ArrowLeft></ArrowLeft></i></el-icon>
        </div>
        <h2 class="text-1.3em">{{ baseInfo?.title }}</h2>
      </div>
      <div class="pr-0.5em">
        <el-icon><i><More></More></i></el-icon>
      </div>
    </div>
    <SearchComp class="pb-0.5em"></SearchComp>
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
            <div class="flex justify-between mb-0.3em">
              <p class="text-#333 text-0.7em">起送￥{{ item.deliveryStart }}</p>
              <div class="text-blue text-0.7em b-blue b-1px b-solid b-rd-0.3em">
                蜂鸟准时达
              </div>
            </div>
            <div class="flex flex-wrap">
              <div v-for="(activity,idx) in item.activities" :key="idx" class="mr-0.3em">
                <div v-if="activity.priority==0" class="b-1px b-#666 b-solid b-rd-5px text-0.3em text-#666 p-0.3em">
                  {{ activity.description }}
                </div>
                <div v-if="activity.priority==1" class="b-1px b-red b-solid b-rd-5px text-0.3em text-red p-0.3em">
                  {{ activity.description }}
                </div>
                <div v-if="activity.priority==2" class="b-1px b-#d1c7ab b-solid b-rd-5px text-0.3em text-#ceb187 p-0.3em">
                  {{ activity.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { get } from '@/auth/auth';
import { base_url } from '@/util/const';
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, More } from '@element-plus/icons-vue';
import SearchComp from '@/components/SearchComp.vue';
const props = defineProps({
  id: { type: Number, required: true }
});
const baseInfo = ref()
onMounted(async()=>{
  await getAllMerchant()
  await getBaseInfo()
})
const merchantList = ref([])
const getAllMerchant = ()=>{
  get(base_url+`/api/merchants/tag/${props.id}`,(data)=>{
    merchantList.value = data
  })
}
const getBaseInfo = ()=>{
  get(base_url+`/api/categories/${props.id}`,(data)=>{
    console.log(data)
    baseInfo.value = data
  })
}
const router = useRouter()
const back = ()=>{
  router.back()
}

const toMerchantInfo = (mid:string)=>{
  router.push({
    name:'merchant',
    params:{
      mid:mid
    }
  })
}
</script>
<style scoped>

</style>
