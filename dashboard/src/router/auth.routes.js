export default [{
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