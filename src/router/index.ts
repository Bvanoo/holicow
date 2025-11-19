import AlertsView from '@/views/AlertsView.vue'
import CommentsView from '@/views/CommentsView.vue'
import DiseasesView from '@/views/DiseasesView.vue'
import FirstConnexion from '@/views/FirstConnexion.vue'
import ProfileView from '@/views/ProfilView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'First Connexion',
      path: '/',
      component: FirstConnexion,
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
      name: 'Profile',
      path: '/profile',
      component: ProfileView,
    },
    //Capture de toutes les routes non définies
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
