import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/round-slider",
    name: "RoundSlider",
    component: import("../views/RoundSlider"),
  },
  {
    path: "/home",
    name: "Home",
    component: import("../views/Home"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
