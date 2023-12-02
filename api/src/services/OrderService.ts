import DefaultService from '@/services/default'
import ProductService from '@/services/ProductService'

import { Order, OrderProduct } from '@/types/Order'

const table: string = 'orders'

export class OrderService extends DefaultService<Order> {

    constructor() {
        super(table)
    }

    async findOrder(id): Promise<Order> {
        try {
            const item = this.db(table).where({ id }).first()
            return item
        } catch (err) {
            console.error(`Erro ao selecionar item em ${table}: `, err)
            throw err
        }
    }

    async findOrderProducts(id) {
        try {
            const orderProducts = await this.db<OrderProduct>('order_products').where({ order_id: id })

            return ProductService.findMany('id', orderProducts.map(({ product_id }) => product_id))
        } catch (err) {
            console.error(`Erro ao consultar produtos do pedido #${id}: `, err)
            throw err
        }
    }
}

export default new OrderService()