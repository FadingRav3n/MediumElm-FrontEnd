<template>
  <div class="bg-white w-100vw h-100vh">
    <div class="flex justify-end flex-col items-center h-35vh">
      <img src="../assets/login-banner.png" alt="" class="w-70%">
    </div>
    <div class="w-full pl-2em pr-2em box-border" v-if="active===0">
      <el-form class="h-30vh">
        <el-input placeholder="请输入手机号" v-model="username" class="mb-0.3em"></el-input>
        <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
        <div class="flex justify-between items-center">
          <div class="text-0.3em h-13em w-full flex justify-start items-center text-gray">
            <p @click="active=1">注册</p>
          </div>
          <div class="text-0.3em h-13em w-full flex justify-end items-center text-gray">
            <p>忘记密码？</p>
          </div>
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
    <div class="w-full pl-2em pr-2em box-border" v-else>
      <el-form class="h-30vh">
        <el-input placeholder="请输入手机号" v-model="username" class="mb-0.3em"></el-input>
        <el-input type="password" placeholder="请输入密码" v-model="password" class="mb-0.3em"></el-input>
        <el-input type="password" placeholder="请再次输入密码" v-model="password_repeat"></el-input>
        <div class="flex justify-between items-center">
          <div class="text-0.3em h-13em w-full flex justify-start items-center text-gray">
            <p @click="active=0">登录</p>
          </div>
          <div class="text-0.3em h-13em w-full flex justify-end items-center text-gray">
            <p>忘记密码？</p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center mb-1em h-3em b-rd-2em bg-blue-3 text-white" @click="startlogin">
          <h3>立即注册</h3>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const active = ref(0)
const username = ref('')
const password = ref('')
const password_repeat = ref('')
const router = useRouter()
const startlogin = ()=>{
  login(username.value,password.value,false,(data)=>{
    console.log(data)
    sessionStorage.setItem('cur_user',data.username)
    sessionStorage.setItem('cur_user_role',data.role)
    if(data.role=='user'){
      router.push({
        name:'home'
      })
    }else{
      router.push({
        name:'admin'
      })
    }
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
