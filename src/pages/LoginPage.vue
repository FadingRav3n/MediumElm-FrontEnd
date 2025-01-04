<template>
  <div class="bg-white w-100vw h-100vh">
    <div class="flex justify-end flex-col items-center h-35vh">
      <img src="../assets/login-banner.png" alt="" class="w-70%">
    </div>
    <div class="w-full pl-2em pr-2em box-border">
      <el-form class="h-30vh">
        <el-input placeholder="请输入手机号" v-model="username" class="mb-0.3em"></el-input>
        <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
        <div class="text-0.3em h-13em w-full flex justify-end items-center text-gray">
          <p>忘记密码？</p>
        </div>
        <div class="w-full flex justify-center items-center mb-1em h-3em b-rd-2em bg-blue-3 text-white" @click="startlogin">
          <h3>立即登录</h3>
        </div>
        <div class="flex">
          <el-radio>
          </el-radio>
          <p class="text-0.4em text-#666 w-90%">
            未注册手机号登录后将自动生成账号，且代表你已阅读并同意<span class="text-blue">《用户服务协议》</span>、<span class="text-blue">《隐私政策》</span>
          </p>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { login } from '@/auth/auth';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const router = useRouter()
const startlogin = ()=>{
  login(username.value,password.value,false,()=>{
    ElMessage({
      message:'登陆成功',
      type:'success'
    })
    router.push({
      name:'home'
    })
  },()=>{
    ElMessage({
      message:'登录失败',
      type:'error'
    })
  })
}
</script>
<style scoped>
:deep(.el-input){
  height: 4em;
  border-radius: 1em;
}
:deep(.el-input__wrapper){
  padding: 0.1em;
}
:deep(.el-input__inner){
  height: 95%;
}
:deep(.el-radio){
  margin: 0;
}
</style>
