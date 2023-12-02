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
}

export default new ProductService()