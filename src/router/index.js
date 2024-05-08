import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import { useUserStore } from '@/stores/login.js'
import RouteListPage from '@/views/RouteListPage.vue'
import RouteDetailPage from '@/views/RouteDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpPage
    },
    {
      path: '/routes',
      name: 'routeList',
      component: RouteListPage
    },
    {
      path: '/routes/:routeId',
      name: 'routeDetail',
      component: RouteDetailPage
    },
  ]
})


router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.fullPath === '/signUp' || to.fullPath === '/login' || to.fullPath === '/') {
    next();
  } else if (!userStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
})

export default router
