export default [{
    path: 'usuarios',
    name: 'users',
    meta: { title: 'Usuários' },
    component: () => import('@/layouts/pages/user/ListUsers.vue')
}, {
    path: 'usuario/novo',
    name: 'new-user',
    meta: { title: 'Novo Usuário' },
    component: () => import('@/layouts/pages/user/UserEdit.vue')
}, {
    path: 'usuario/:id',
    name: 'user-profile',
    meta: { title: 'Perfil do Usuário' },
    component: () => import('@/layouts/pages/user/UserDetails.vue')
}, {
    path: 'usuario/:id/editar',
    name: 'user-edit',
    meta: { title: 'Editar Usuário' },
    component: () => import('@/layouts/pages/user/UserEdit.vue')
}, {
    path: 'usuario',
    redirect: { name: 'users' }
}]