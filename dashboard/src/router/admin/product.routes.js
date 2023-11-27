export default [{
    path: 'produtos',
    name: 'products',
    meta: { title: 'Produtos' },
    component: () => import('@/layouts/pages/product/ListProduct.vue')
}, {
    path: 'produto/novo',
    name: 'new-product',
    meta: { title: 'Novo Produto' },
    component: () => import('@/layouts/pages/product/ListUsers.vue')
}, {
    path: 'produto/:id',
    name: 'product-detail',
    meta: { title: 'Detalhes do Produto' },
    component: () => import('@/layouts/pages/product/ListUsers.vue')
}]