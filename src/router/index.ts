import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    {
      name: 'about',
      path: '/about',
      component: AboutView,
    },
    {
      path: '/:catchAll(.*)', // Capture toutes les routes non définies
      redirect: '/', // Redirige vers la route home
    },
  ],
})

export default router
