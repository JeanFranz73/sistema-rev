export default [{
    path: 'usuarios',
    name: 'users',
    meta: { title: 'Usuários' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}, {
    path: 'usuario/novo',
    name: 'new-user',
    meta: { title: 'Novo Usuário' },
    component: () => import('@/layouts/pages/UserProfile.vue')
}, {
    path: 'usuario/:id',
    name: 'user-profile',
    meta: { title: 'Perfil do Usuário' },
    component: () => import('@/layouts/pages/UserProfile.vue')
}]