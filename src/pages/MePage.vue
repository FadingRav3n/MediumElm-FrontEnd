<template>
  <div class="w-full h-full box-border">
    <header class="w-full  bg-[linear-gradient(90deg,#e3edf6,#f4f8fb)] box-border pl-1em pr-1em">
      <div class="flex justify-between items-center w-full h-4em">
        <img src="" alt="">
        <el-icon><i><Setting></Setting></i></el-icon>
      </div>
      <div class="bg-#1a1a1a border-rd-tr-1em border-rd-tl-1em h-5em w-full"></div>
    </header>
    <div class="w-full bg-[#f4f8fb] b-rd-tr-1em b-rd-tl-12em">
      <div class="w-full">

      </div>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts" setup>
import FooterComp from '@/components/FooterComp.vue';
import { ref } from 'vue';
import { Setting } from '@element-plus/icons-vue';
const userInfo = ref()

</script>
<style scoped>
</style>
