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
    //Capture de toutes les routes non définies
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
