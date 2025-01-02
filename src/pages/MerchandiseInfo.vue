<template>
  <div class="w-100vw h-100vh box-border p-1em">
    <!-- 标题和返回按钮 -->
    <div class="flex items-center pb-1em">
      <div @click="back()" class="w-3em">
        <el-icon><i><ArrowLeft></ArrowLeft></i></el-icon>
      </div>
      <h2>商品管理</h2>
    </div>

    <!-- 新增按钮 -->
    <el-button @click="openAddDialog" type="primary">新增商品</el-button>

    <!-- 商品列表 -->
    <el-table :data="merchandiseData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="商品名" />
      <el-table-column prop="cost" label="成本" />
      <el-table-column prop="rate" label="评分" />
      <el-table-column prop="discount" label="折扣" />
      <el-table-column prop="icon" label="icon" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button @click="openEditDialog(row)" size="small">编辑</el-button>
          <el-button @click="deleteMerchanise(row.id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑商品对话框 -->
    <el-dialog v-model="dialogVisible" title="新增/编辑商品">
      <el-form :model="formData">
        <el-form-item label="商品名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="formData.cost" type="number" />
        </el-form-item>
        <el-form-item label="评分">
          <el-input v-model="formData.rate" type="number" />
        </el-form-item>
        <el-form-item label="折扣">
          <el-input v-model="formData.discount" type="number" />
        </el-form-item>
        <el-form-item label="icon">
          <el-input v-model="formData.icon" type="string" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMerchanise">保存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { base_url } from '@/util/const';
import axios from 'axios';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  id: { type: String, required: true }
});

// 数据和状态
const merchandiseData = ref<any[]>([]);
const dialogVisible = ref(false);
const formData = ref<any>({});
const router = useRouter();

// 页面加载时获取商品数据
onMounted(async () => {
  await getAllMerchandises();
});

// 获取商品列表
const getAllMerchandises = async () => {
  await axios.get(base_url + '/api/merchandises/'+props.id).then((resp)=>{
    console.log(resp.data)
    merchandiseData.value = resp.data
  })
};

// 返回到商家列表页面
const back = () => {
  router.back();
};

// 打开新增商品对话框
const openAddDialog = () => {
  formData.value = {}; // 清空表单数据
  dialogVisible.value = true;
  formData.value.menuId = props.id
};

// 打开编辑商品对话框
const openEditDialog = (row: any) => {
  formData.value = { ...row }; // 复制选中的商品数据
  formData.value.menuId = props.id
  dialogVisible.value = true;
};

// 保存商品（新增/编辑）
const saveMerchanise = async () => {
  formData.value.menuId = props.id
  const url = formData.value.id ? base_url + '/api/merchandises/' + formData.value.id : base_url + '/api/merchandises';
  const method = formData.value.id ? 'put' : 'post';

  try {
    await axios({ method, url, data: formData.value });
    dialogVisible.value = false;
    await getAllMerchandises(); // 刷新商品列表
  } catch (error) {
    console.error(error);
  }
};

// 删除商品
const deleteMerchanise = async (id: string) => {
  try {
    await axios.delete(base_url + '/api/merchandises/' + id);
    await getAllMerchandises(); // 刷新商品列表
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
