<template>
  <div class="w-100vw h-100vh box-border p-1em">
    <h2 class="pb-1em">后台管理系统</h2>
    <el-button @click="openAddDialog">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="deliveryFee" label="Delivery Fee" />
      <el-table-column prop="deliveryStart" label="Delivery Start" />
      <el-table-column prop="rate" label="Rate" />
      <el-table-column prop="soldout" label="Soldout" />
      <el-table-column prop="distance" label="Distance" />
      <el-table-column prop="icon" label="Icon" />
      <el-table-column prop="banner" label="Banner" />
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button @click="openEditDialog(row)" size="small">编辑</el-button>
          <el-button @click="deleteMerchant(row.id)" size="small" type="danger">删除</el-button>
          <el-button @click="openDetailsDialog(row)" size="small" type="info">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑商家对话框 -->
    <el-dialog v-model="dialogVisible" title="新增商家">
      <el-form :model="formData">
        <el-form-item label="Name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="Delivery Fee">
          <el-input v-model="formData.deliveryFee" />
        </el-form-item>
        <el-form-item label="Delivery Start">
          <el-input v-model="formData.deliveryStart" />
        </el-form-item>
        <el-form-item label="Rate">
          <el-input v-model="formData.rate" />
        </el-form-item>
        <el-form-item label="Soldout">
          <el-input v-model="formData.soldout" />
        </el-form-item>
        <el-form-item label="Distance">
          <el-input v-model="formData.distance" />
        </el-form-item>
        <el-form-item label="Icon">
          <el-input v-model="formData.icon" placeholder="图床url" />
        </el-form-item>
        <el-form-item label="Banner">
          <el-input v-model="formData.banner" placeholder="图床url" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMerchant">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="modifydialogVisible" title="修改商家">
      <el-form :model="formData">
        <el-form-item label="Name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="Delivery Fee">
          <el-input v-model="formData.deliveryFee" />
        </el-form-item>
        <el-form-item label="Delivery Start">
          <el-input v-model="formData.deliveryStart" />
        </el-form-item>
        <el-form-item label="Rate">
          <el-input v-model="formData.rate" />
        </el-form-item>
        <el-form-item label="Soldout">
          <el-input v-model="formData.soldout" />
        </el-form-item>
        <el-form-item label="Distance">
          <el-input v-model="formData.distance" />
        </el-form-item>
        <el-form-item label="Icon">
          <el-input v-model="formData.icon" placeholder="图床url" />
        </el-form-item>
        <el-form-item label="Banner">
          <el-input v-model="formData.banner" placeholder="图床url" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifydialogVisible = false">取消</el-button>
        <el-button type="primary" @click="modifyMerchant">修改</el-button>
      </span>
    </el-dialog>
    <!-- 商品详情对话框 -->
    <el-dialog v-model="detailsDialogVisible" title="商品详情">
      <div v-if="detailsData">
        <el-row :gutter="20">
          <el-col :span="6"><strong>Name:</strong> {{ detailsData.name }}</el-col>
          <el-col :span="6"><strong>Rate:</strong> {{ detailsData.rate }}</el-col>
          <el-col :span="6"><strong>Distance:</strong> {{ detailsData.distance }}</el-col>
          <el-col :span="6"><strong>Soldout:</strong> {{ detailsData.soldout }}</el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12"><strong>Icon:</strong> <img :src="detailsData.icon" alt="icon"
              style="width: 50px; height: 50px;" /></el-col>
          <el-col :span="12"><strong>Banner:</strong> <img :src="detailsData.banner" alt="banner"
              style="width: 100px; height: 100px;" /></el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { base_url } from '@/util/const';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { delete_, getQuery, post, put } from '@/auth/auth';

// 数据和状态
const tableData = ref<any[]>([]);
const dialogVisible = ref(false);
const detailsDialogVisible = ref(false);
const formData = ref<any>({});
const detailsData = ref<any>({});
const modifydialogVisible = ref(false)

onMounted(async () => {
  await getAllMerchants();
});

// 获取商家列表
const getAllMerchants = async () => {
  getQuery(base_url + '/api/merchants',{
    pageNum: 1,
    pageSize: 100
  },(data)=>{
    tableData.value = data.list;
  })
};

// 新增商家
const openAddDialog = () => {
  formData.value = {}; // 清空表单数据
  dialogVisible.value = true;
};

// 编辑商家
const openEditDialog = (row: any) => {
  formData.value = { ...row }; // 复制选中的商家数据
  modifydialogVisible.value = true;
};

// 保存商家（新增/编辑）
const saveMerchant = async () => {
  console.log(formData.value)
  post(base_url + '/api/merchants',formData.value,(data)=>{
    console.log(data)
  })
  dialogVisible.value = false;
  await getAllMerchants(); // 刷新商家列表
};

const modifyMerchant = async()=>{
  put(base_url+'/api/merchants/'+formData.value.id,formData.value,(data)=>{
    console.log(data)
  })
  // await axios.put(base_url+'/api/merchants/'+formData.value.id,formData.value).then((resp)=>{
  //   console.log(resp.data)
  // })
  modifydialogVisible.value = false
  await getAllMerchants()
}
// 删除商家
const deleteMerchant = async (id: number) => {
  delete_(base_url + '/api/merchants/' + id,(data)=>{
    console.log(data)
  })
  // await axios.delete(base_url + '/api/merchants/' + id).then((resp)=>{
  //   console.log(resp.data)
  // });
  await getAllMerchants(); // 刷新商家列表
};

const router = useRouter()
const openDetailsDialog = (row: any) => {
  router.push({
    name:'menu',
    params:{
      id:row.id
    }
  })
};
</script>

<style scoped></style>
