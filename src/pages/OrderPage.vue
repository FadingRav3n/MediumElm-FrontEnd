<template>
  <div>
    {{ items }}
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

// 使用 useRoute 获取路由信息
const route = useRoute();
const items = ref()
onBeforeMount(() => {
  const selectedItemsStr = route.query.selectedItems;
  if (selectedItemsStr) {
    const selectedItemsArray = JSON.parse(selectedItemsStr as string);
    items.value = selectedItemsArray
    console.log('Selected Items:', selectedItemsArray);  // 打印传递过来的选中的商品
    // 你可以将 selectedItemsArray 存储在你的组件状态中
  }
});
</script>
<style scoped>
</style>
