import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/page/home/HomeView.vue";
import CardView from "@/page/Card/CardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/card/:id',
      name: 'card',
      component: CardView,
    },
  ],
})

export default router
