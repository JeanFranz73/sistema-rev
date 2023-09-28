export default [{
    path: 'pedidos',
    name: 'orders',
    meta: { title: 'Pedidos' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}, {
    path: 'pedido/novo',
    name: 'new-order',
    meta: { title: 'Novo Pedido' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}, {
    path: 'pedido/:id',
    name: 'order-detail',
    meta: { title: 'Detalhes do Pedido' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}]