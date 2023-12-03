export default [{
    path: 'admin-produtos',
    name: 'admin-products',
    meta: { title: 'Produtos', adminRequired: true, useRoute: 'products' },
    component: () => import('@/layouts/pages/product/ListProduct.vue')
},{
    path: 'produtos',
    name: 'products',
    meta: { title: 'Produtos', adminRequired: false },
    component: () => import('@/layouts/pages/product/ListProductClient.vue')
}, {
    path: 'produto/novo',
    name: 'new-product',
    meta: { title: 'Novo Produto', adminRequired: true },
    component: () => import('@/layouts/pages/product/ProductEdit.vue')
}, {
    path: 'produto/:id/editar',
    name: 'product-edit',
    meta: { title: 'Editar Produto', adminRequired: true },
    component: () => import('@/layouts/pages/product/ProductEdit.vue')
}, {
    path: 'produto/:id',
    name: 'product-detail',
    meta: { title: 'Detalhes do Produto', adminRequired: false },
    component: () => import('@/layouts/pages/product/ProductDetails.vue')
}]