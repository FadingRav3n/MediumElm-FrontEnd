<template>
  <div class="w-full h-full bg-[#f4f8fb] box-border pl-0.5em pr-0.5em pt-0.5em">
    <header class="w-full h-[2em] flex justify-start items-center box-border pl-0.5em pr-0.5em mb-1em">
      <h2 class="text-size-[1.3em] w-80%">消息中心</h2>
      <div class="w-20% flex justify-around items-center">
        <el-icon><i class="text-1.3em"><Paperclip></Paperclip></i></el-icon>
        <el-icon><i class="text-1.3em"><Setting></Setting></i></el-icon>
      </div>
    </header>
    <div class="ml-0.5em mr-0.5em mb-2em">
      <h3 class="text-size-1em mb-0.5em">平台消息</h3>
      <div class="border-rd-0.5em bg-white w-full h-4em">
        <img src="../assets/message-report.jpg" alt="" class="w-100%">
      </div>
    </div>
    <div class="ml-0.5em mr-0.5em">
      <h3 class="text-size-1em mb-0.5em">聊天动态</h3>
      <div class="border-rd-0.5em bg-white w-full h-62vh flex justify-center items-center flex-col">
        <img src="../assets/message-banner.png" alt="" class="w-12em h-9em">
        <h3 class="text-1.1em m-0.3em fw-300">竟然没有消息</h3>
        <p class="text-#777 text-0.8em">你知道吗 我永远是你招之即来的朋友</p>
      </div>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>
<script lang="ts" setup>
import FooterComp from '@/components/FooterComp.vue';
import { Setting,Paperclip } from '@element-plus/icons-vue';
</script>
<style scoped>
</style>
