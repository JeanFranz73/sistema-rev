import { createRouter, createWebHistory } from 'vue-router'
import { installAfter } from '@/helpers'
import userRoutes from '@/router/userRoutes'
import orderRoutes from '@/router/orderRoutes'
import { useSessionStore } from '@/stores'

const dashboardRoutes = {
    path: '/painel',
    name: 'dashboard',
    meta: { title: 'Painel' },
    component: () => import('@/views/DashboardView.vue'),
    children: [
        ...userRoutes,
        ...orderRoutes
    ]
}
const authRoutes = [{
    path: '/entrar',
    name: 'login',
    meta: { title: 'Entrar', noAuth: true },
    component: () => import('@/views/LoginView.vue')
}, {
    path: '/registrar',
    name: 'register',
    meta: { title: 'Registrar', noAuth: true },
    component: () => import('@/views/RegisterView.vue')
}]

const routes = [
    { path: '/', redirect: '/painel' },
    dashboardRoutes,
    ...authRoutes,
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
        if (to.meta.noAuth) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        if (to.meta.noAuth) {
            next({ name: 'dashboard' }).then(() => {
                this.$toasts.success('Você já está logado!')
            })
        } else {
            next()
        }
    }
})
