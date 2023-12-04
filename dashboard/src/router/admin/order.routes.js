export default [{
    path: 'pedidos',
    name: 'orders',
    meta: { title: 'Pedidos' },
    component: () => import('@/layouts/pages/order/ListOrder.vue')
}, {
    path: 'pedido/:id',
    name: 'order-detail',
    meta: { title: 'Detalhes do Pedido' },
    component: () => import('@/layouts/pages/order/OrderView.vue')
}]