<template>
  <div class="container">
    <h4>{{ msg }}</h4>
    <el-button type="primary" @click="add">点我加1</el-button>
    <el-button type="danger" @click="minus">点我减1</el-button>
    <p>{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg?: string }>();

const count = ref(0);
const add = () => count.value++;
const minus = () => count.value--;
</script>

<style scoped less>
.container {
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid orange;
}
</style>
