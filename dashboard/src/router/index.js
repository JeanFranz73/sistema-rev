import { createRouter, createWebHistory } from 'vue-router'
import { installAfter } from '@/helpers'
import userRoutes from '@/router/userRoutes'
import orderRoutes from '@/router/orderRoutes'
import { useSessionStore } from '@/stores'

const dashboardRoutes = [
    ...userRoutes,
    ...orderRoutes
]

const authRoutes = [{
    path: '/entrar',
    name: 'login',
    meta: { title: 'Entrar' },
    component: () => import('@/views/LoginView.vue')
}, {
    path: '/registrar',
    name: 'register',
    meta: { title: 'Registrar' },
    component: () => import('@/views/RegisterView.vue')
}]

const routes = [
    { path: '/', redirect: '/painel' },
    ...authRoutes,
    {
        path: '/painel',
        name: 'dashboard',
        meta: { title: 'Painel' },
        component: () => import('@/views/DashboardView.vue'),
        children: dashboardRoutes
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.afterEach(installAfter)

router.beforeEach((to, from, next) => {
    const session = useSessionStore()

    document.title = to.meta.title + ' | Divar Semijoias'

    if (!session.isLoggedIn) {
        if (to.name == 'login' ||
            to.name == 'register') {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})
