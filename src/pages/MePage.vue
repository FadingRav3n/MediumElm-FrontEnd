<template>
  <div class="w-full h-full box-border">
    <header class="w-full h-8em  bg-[linear-gradient(90deg,#e6edf9,#f4f8fb)] box-border pl-1em pr-1em">
      <div class="flex justify-between items-center w-full h-4em">
        <img src="" alt="">
        <el-icon><i><Setting></Setting></i></el-icon>
      </div>
      <div class="bg-#1a1a1a border-rd-1em h-5em w-full"></div>
    </header>
    <div class="w-full mt-[-1em] bg-[#f4f8fb]">

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
