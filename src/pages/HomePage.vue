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
          <p class="text-size-[0.9em] flex justify-center items-center">云南大学呈贡校区楸苑<el-icon><i>
                <ArrowDown></ArrowDown>
              </i></el-icon> </p>
        </div>
      </div>
      <SearchComp></SearchComp>
    </header>
    <div class="w-full h-full mt-[5em]">
      <img src="../assets/home-banner.jpg" alt="" class="w-full">
      <div class="w-full flex flex-basis-5em flex-wrap">
        <div v-for="(item, idx) in categories" :key="idx"
          class="w-20% h-4em flex justify-center items-center flex-col bg-#fffffd" @click="changeToTagDetail(item.id)">
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
          class="w-100% h-9em border-rd-10px bg-white shadow-md box-border p-1em flex justify-center items-center mb-0.5em"
          @click="toMerchantInfo(item.id)">
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
      <div v-if="isLoading" class="text-center text-gray-500 text-0.5em h-3em">加载中...</div>
      <div v-if="!hasMore" class="text-center text-gray-500 text-0.5em h-3em">没有更多数据了</div>
      <div class="w-full h-3.4em"></div>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref,onUnmounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import FooterComp from '@/components/FooterComp.vue';
import { useRouter } from 'vue-router';
import { base_url } from '@/util/const';
import { get, getQuery } from '@/auth/auth';
import SearchComp from '@/components/SearchComp.vue';
const categories = ref([])
const merchantList = ref([])
const pageNum = ref(1);
const pageSize = ref(2);
const isLoading = ref(false);
const hasMore = ref(true);
let prev = 0
const getAllCategories = async () => {
  get(base_url + '/api/categories', (data) => {
    categories.value = data;
    console.log(data);
  });
};
const getAllMechant = async () => {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  getQuery(
    base_url + '/api/merchants',
    { pageNum: pageNum.value, pageSize: pageSize.value },
    (data) => {
      console.log(data)
      if(prev!=data.pageNum){
        if (data.list && data.list.length > 0) {
          merchantList.value = [...merchantList.value, ...data.list];
          pageNum.value++;
          if(!data.hasNextPage){
            hasMore.value = false;
          }
        } else {
          hasMore.value = false;
        }
        prev=data.pageNum
      }
    }
  );

  isLoading.value = false;
};

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= scrollHeight - 10) {
    getAllMechant();
  }
};


// const getAllMechant = async () => {
//   getQuery(base_url + '/api/merchants', {
//     pageNum: 1,
//     pageSize: 2
//   },
//     (data) => {
//       console.log(data)
//       merchantList.value = data.list
//     }
//   )
// }

const router = useRouter()
const toMerchantInfo = (mid: string) => {
  router.push({
    name: 'merchant',
    params: {
      mid: mid
    }
  })
}

const changeToTagDetail = (val) => {
  router.push({
    name: 'tag',
    params: {
      id: val
    }
  })
}

onMounted(async () => {
  await getAllMechant();
  await getAllCategories();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped></style>
