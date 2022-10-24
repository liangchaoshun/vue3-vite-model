<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/ncm">网易云</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/three">Three</router-link>
  </div>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  line-height: 30px;
  margin: 10px auto;
}
</style>
