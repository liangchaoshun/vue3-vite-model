import fs from "fs";
import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 开发代理设置
const setProxy = () => {
  let proxy = {
    // 代理，默认配置
    "/api": {
      // url 会自动补全：`${target}/api`
      target: "http://localhost:7716/cms/yjdp", // 本地服务，根据情况修改
      secure: false,
      changeOrigin: true,
    },
    "/netcloud": {
      // url 会自动补全：`${target}/api`
      // target: 'http://localhost:5001', // 本地服务
      target: "https://liangchaoshun.top/netcloud", // 线上服务-无需端口
      secure: false,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/netcloud/, ""),
    },
  };

  try {
    fs.accessSync(path.join(__dirname, "proxy-local.js"));
    const localProxy = require("./proxy-local.js");
    proxy = localProxy;
  } catch (error) {}

  return proxy;
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
      },
    },
  },
  server: {
    port: 3005,
    open: true,
    proxy: setProxy(),
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
