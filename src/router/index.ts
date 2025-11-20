import AlertsView from '@/views/AlertsView.vue'
import CommentsView from '@/views/CommentsView.vue'
import DiseasesView from '@/views/DiseasesView.vue'
import FirstConnexion from '@/views/FirstConnexion.vue'
import HomeView from '@/views/HomeView.vue'
import NotAllowed from '@/views/NotAllowed.vue'
import ProfileView from '@/views/ProfilView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: `page d'accueil`,
      path: '/',
      component: HomeView,
    },
    {
      name: 'First Connexion',
      path: '/firstConnexion',
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
    {
      name: 'Not Allowed',
      path: '/notAllowed',
      component: NotAllowed,
    },
    //Capture de toutes les routes non définies
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
