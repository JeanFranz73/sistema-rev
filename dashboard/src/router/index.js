import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores'
import { installAfter } from '@/helpers'
import authRoutes from '@/router/auth.routes'
import userRoutes from '@/router/admin/user.routes'
import orderRoutes from '@/router/admin/order.routes'
import productRoutes from '@/router/admin/product.routes'

const dashboardRoutes = {
    path: '/painel',
    name: 'dashboard',
    meta: { title: 'Painel' },
    component: () => import('@/views/DashboardView.vue'),
    children: [
        ...userRoutes,
        ...orderRoutes,
        ...productRoutes
    ]
}

const cartRoute = {
    path: '/carrinho',
    name: 'cart',
    meta: { title: 'Carrinho' },
    component: () => import('@/pages/order/CartView.vue')
}

const routes = [
    { path: '/', redirect: { name: 'dashboard' }},
    cartRoute,
    dashboardRoutes,
    ...authRoutes,
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
    linkActiveClass: 'active',
    routes
})

router.afterEach(installAfter)

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' | Sistema de Pedidos'

    const session = useSessionStore()

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
