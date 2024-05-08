import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import { useUserStore } from '@/stores/login.js'

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
