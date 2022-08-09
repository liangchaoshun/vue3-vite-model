<template>
  <div class="ncm">
    <h1>This is an ncm page</h1>
    <h3>网易云音乐</h3>
    
  <div style="margin: 20px" />
  <el-form
    label-position="right"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="Name">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="formLabelAlign.region" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="formLabelAlign.type" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="fetchBanner">获取banner</el-button>
  </div>

</template>

<script lang="ts" setup>
import { banner } from '@/api/ncm';
import { reactive, ref } from 'vue'

const fetchBanner = async () => {
  try {
    const res = await banner();
    console.log('banner => ', res)
  } catch (error) {
    console.log("fetch netcloud banner failed => ", error);
  }
}


const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>

