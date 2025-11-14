import AlertsView from '@/views/AlertsView.vue'
import CommentsView from '@/views/CommentsView.vue'
import DiseasesView from '@/views/DiseasesView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfilView from '@/views/ProfilView.vue'
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
      name: 'maladies',
      path: '/maladies',
      component: DiseasesView,
    },
    {
      name: 'commentaires',
      path: '/commentaires',
      component: CommentsView,
    },
    {
      name: 'Alertes',
      path: '/alertes',
      component: AlertsView,
    },
    {
      name: 'Profil',
      path: '/profil',
      component: ProfilView,
    },
    //Capture de toutes les routes non définies
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
