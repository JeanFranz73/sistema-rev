import DefaultService from '@/services/default'
import { Product, ProductCategory } from '@/types/Product'

const table: string = 'products'

export class ProductService extends DefaultService<Product> {

    constructor() {
        super(table)
    }

    getProductCategories() {
        try {
            const categories = this.db<ProductCategory>('product_categories').select()
            return categories
        } catch (err) {
            console.error('Erro ao selecionar categorias de produtos: ', err)
            throw err
        }
    }

    async verifyStock(product: Product) {
        try {
            const amount = product.amount || product.stock
            const dbProduct = await this.findById(product.id)
            if (!dbProduct) {
                throw new Error(`Produto #${product.id} não encontrado`)
            }

            if (dbProduct.stock < amount) {
                throw new Error(`Produto #${product.id} sem estoque suficiente`)
            }
        } catch (err) {
            console.error('Erro ao verificar estoque: ', err)
            return err
        }
    }
}

export default new ProductService()