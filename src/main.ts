import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入路由配置
import store from "./store"; // 引入状态管理配置

createApp(App).use(router).use(store).mount("#app");
