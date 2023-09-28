export default [{
    path: 'produtos',
    name: 'products',
    meta: { title: 'Produtos' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}, {
    path: 'produto/novo',
    name: 'new-product',
    meta: { title: 'Novo Produto' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}, {
    path: 'produto/:id',
    name: 'product-detail',
    meta: { title: 'Detalhes do Produto' },
    component: () => import('@/layouts/pages/UsersPage.vue')
}]