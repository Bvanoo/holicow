import AlertsView from '@/presentation/views/AlertsView.vue'
import CommentsView from '@/presentation/views/CommentsView.vue'
import DiseasesView from '@/presentation/views/ProblemsView.vue'
import FirstConnexion from '@/presentation/views/FirstConnexion.vue'
import HomeView from '@/presentation/views/HomeView.vue'
import NotAllowed from '@/presentation/views/NotAllowed.vue'
import ProfileView from '@/presentation/views/ProfilView.vue'
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
    {
      path: '/subdeseases/:data',
      name: 'sub problems',
      component: () => import('@/presentation/views/SubProblemsView.vue'),
    },
    //Capture de toutes les routes non définies
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
})

export default router
