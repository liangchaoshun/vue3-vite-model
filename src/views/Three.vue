<template>
  <div id="canvas-box">
    <canvas id="canvas-3d" class="canvas-3d"></canvas>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ThreeJs from '../three/threeEntity'

onMounted(() => {
  new ThreeJs()
  console.log('Three.vue mounted => ')
})
</script>

<style scoped lang="less">
.canvas-3d {
  width: 100%;
  height: calc(100vh - 70px);
}
</style>
