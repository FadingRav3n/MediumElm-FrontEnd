<template>
  <div class="w-100vw h-100vh box-border p-1em">
    <!-- 标题和返回按钮 -->
    <div class="flex items-center pb-1em">
      <div @click="back()" class="w-3em">
        <el-icon><i>
            <ArrowLeft></ArrowLeft>
          </i></el-icon>
      </div>
      <h2>菜单设置</h2>
    </div>

    <!-- 新增按钮 -->
    <el-button @click="openAddDialog" type="primary">新增菜单</el-button>

    <!-- 菜单列表 -->
    <el-table :data="menuData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="title" label="菜单名" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button @click="openEditDialog(row)" size="small">编辑</el-button>
          <el-button @click="deleteMenu(row.id)" size="small" type="danger">删除</el-button>
          <el-button @click="openDetailDialog(row)" size="small" type="info">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑菜单对话框 -->
    <el-dialog v-model="dialogVisible" title="新增/编辑菜单">
      <el-form :model="formData">
        <el-form-item label="菜单名">
          <el-input v-model="formData.title" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMenu">保存</el-button>
      </span>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="菜单详情">
      <div>
        <p><strong>ID:</strong> {{ detailData.id }}</p>
        <p><strong>菜单名:</strong> {{ detailData.title }}</p>
        <p><strong>所属商家ID:</strong> {{ detailData.merchantId }}</p>
      </div>
      <span class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
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
import { delete_, get, post } from '@/auth/auth';

const props = defineProps({
  id: { type: String, required: true }
});

const menuData = ref<any[]>([]);
const dialogVisible = ref(false);
const detailDialogVisible = ref(false);
const formData = ref<any>({});
const detailData = ref<any>({});
const router = useRouter();

onMounted(async () => {
  await getAllMenus();
});

const getAllMenus = async () => {
  get(base_url + '/api/menus/' + props.id,(data)=>{
    menuData.value = data;
  })
};

const back = () => {
  router.back();
};

const openAddDialog = () => {
  formData.value = {};
  formData.value.mid = props.id;
  dialogVisible.value = true;
};

const openEditDialog = (row: any) => {
  formData.value = { ...row };
  dialogVisible.value = true;
};

const openDetailDialog = (row: any) => {
  router.push({
    name:'merchanise',
    params:{
      id:row.id
    }
  })
};

const saveMenu = async () => {
  post(base_url + '/api/menus', formData.value,(data)=>{
    console.log(data)
  })
  dialogVisible.value = false;
  await getAllMenus(); // 刷新菜单列表
};

// 删除菜单
const deleteMenu = async (id: string) => {
  delete_(base_url + '/api/menus/' + id,(data)=>{
    console.log(data)
  })
};
</script>

<style scoped></style>
