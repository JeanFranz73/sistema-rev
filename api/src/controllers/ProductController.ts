import { ProductType } from '@/types/Product'
import ProductService from '@/services/ProductService'

class ProductController {
    async findAll(): Promise<ProductType[]> {
        const Products: ProductType[] = await ProductService.findAll()
        return Products
    }

    async find(id: number | string): Promise<ProductType> {
        const Product: ProductType = await ProductService.findById(id)

        if (!Product) {
            throw new Error('Produto não encontrado')
        }

        return Product
    }

    async add(Product: ProductType) {

        const ProductId = await ProductService.create(Product)

        if (ProductId) {
            return await ProductService.findById(ProductId[0])
        }

        throw new Error('Erro ao adicionar produto')
    }

    async edit(ProductId: number | string, Product: ProductType) {
        const dbProduct = await this.find(ProductId)

        await ProductService.update(dbProduct.id, Product)

        return {
            ...dbProduct,
            ...Product
        }
    }

    async getProductCategories() {
        return await ProductService.getProductCategories()
    }
}

export default new ProductController()