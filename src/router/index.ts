import AlertsView from '@/presentation/views/AlertsView.vue'
import CommentsView from '@/presentation/views/CommentsView.vue'
import DiseasesView from '@/presentation/views/ProblemsView.vue'
import FirstConnexion from '@/presentation/views/FirstConnexion.vue'
import HomeView from '@/presentation/views/HomeView.vue'
import NotAllowed from '@/presentation/views/NotAllowed.vue'
import ProfileView from '@/presentation/views/ProfilView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/User'
import SolutionView from '@/presentation/views/SolutionView.vue'
import SolutionListView from '@/presentation/views/SolutionListView.vue'
// import SolutionsListView from '@/presentation/views/SolutionsListView.vue'

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
      name: 'problemes',
      path: '/problemes',
      component: DiseasesView,
    },
    {
      name: 'sub problems',
      path: '/sousproblemes/:data',
      component: () => import('@/presentation/views/SubProblemsView.vue'),
    },
    {
      name: 'solutions',
      path: '/solutions/:data',
      component: () => import('@/presentation/views/SolutionView.vue'),
    },
    {
      name: 'solutionsList',
      path: '/solutionsList/:data',
      component: () => import('@/presentation/views/SolutionListView.vue'),
    },
    {
      name: 'commentaires',
      path: '/commentaires',
      component: CommentsView,
    },
    {
      name: 'Alerte',
      path: '/alert/:data',
      component: () => import('@/presentation/views/AlertView.vue'),
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
//Avant chaque changement de route
router.beforeEach(async (to /*, from*/) => {
  const userStore = useUserStore()
  //START Bloquage des routes si on est un nouveau profil

  // On récupère le profil s'il n'est pas récupéré
  if (userStore.isHydrate === false) {
    await userStore.hydrateApp()
  }

  if (userStore.isNewProfil && to.name !== 'First Connexion') {
    /* console.log('userStore.isNewProfil', userStore.isNewProfil)*/
    return '/firstConnexion'
  }
  //END Bloquage des routes si on est un nouveau profil
})
export default router
