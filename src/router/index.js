import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/scoreboard',
      name: 'scoreBoard',
      component: () => import('../views/ScoreBoard.vue'),
    },
  ],
})

export default router
