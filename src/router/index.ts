import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/ncm",
    name: "cm",
    component: () => import("@/views/Ncm.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
