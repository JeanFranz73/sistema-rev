import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'


const dashboardRoutes = [
  {
    path: 'users',
    name: 'Users',
    component: () => import('@/layouts/pages/UsersPage.vue')
  },
  {
    path: 'user/:id',
    name: 'user-profile',
    component: () => import('@/layouts/pages/UserProfile.vue')
  }
]

const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  }
]

const routes = [
  { path: '/', redirect: '/dashboard' },
  ...authRoutes,
  {
    path: '/dashboard',
    name: 'Painel',
    component: DashboardView,
    children: dashboardRoutes
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router