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
import TestView from '@/presentation/views/TestView.vue'
// import SolutionsListView from '@/presentation/views/SolutionsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: ``,
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
      name: 'test',
      path: '/test',
      component: TestView,
    },
    {
      name: 'sub problems',
      path: '/sousproblemes/:data',
      component: () => import('@/presentation/views/SubProblemsView.vue'),
    },
    {
      name: 'solution',
      path: '/solution/:data',
      component: () => import('@/presentation/views/SolutionView.vue'),
    },
    {
      name: 'solutionsList',
      path: '/solutionsList/:data(\\d+)*',
      component: () => import('@/presentation/views/SolutionListView.vue'),
    },
    {
      name: 'commentaires',
      path: '/commentaires',
      component: CommentsView,
    },
    {
      name: 'alerte',
      path: '/alert/:data',
      component: () => import('@/presentation/views/AlertView.vue'),
    },
    {
      name: 'profile',
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
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  // On hydrate le store
  if (userStore.isHydrate === false) {
    await userStore.hydrateApp()
  }
  //Blocage de l'admin s'il veut aller sur la route profile
  if (userStore.currentProfile?.role === 'Administrator' && to.name === 'profile') return from
  //Blocage du nouvel utilisateur
  if (userStore.isNewProfil && to.name !== 'First Connexion') {
    return '/firstConnexion'
  }
})
export default router
