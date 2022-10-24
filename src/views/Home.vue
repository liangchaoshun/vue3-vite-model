<template>
  <div class="home">
    <div class="logo">
      <el-button type="primary" @click="changeImage">切换图片</el-button>
      <div class="dog-container">
        <img alt="Vue logo" :src="src" />
      </div>
    </div>
    <div>{{ date }}</div>
    <show-count msg="计数-组件" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowCount from '@/components/Show-Count.vue'
import logo from '../assets/imgs/logo.png'
import { fetchDogImg } from '@/api/funny'

const date = ref<Date>()
const src = ref<string>(logo)

onMounted(async () => {
  date.value = new Date()
})

// 获取狗狗的图片接口是国外的，不一定每次都成功
const changeImage = async () => {
  try {
    const { message = 'something message' } = await fetchDogImg()
    src.value = message
  } catch (error) {
    console.log('fetch dog image failed => ', error)
  }
}
</script>
<style scoped lang="less">
.logo {
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid aqua;
  .dog-container {
    width: 300px;
    height: auto;
    margin: 5px auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
