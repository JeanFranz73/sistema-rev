import DefaultService from '@/services/default'
import ProductService from '@/services/ProductService'

import { Order, OrderProduct } from '@/types/Order'

const table: string = 'orders'

export class OrderService extends DefaultService<Order> {

    constructor() {
        super(table)
    }

    async generate(order: Order) {
        try {

            const { products } = order

            if (!order.user) {
                throw new Error('Usuário do pedido não informado')
            }

            if (!products || !products.length) {
                throw new Error('Produtos não informados')
            }

            products.map(product => {
                return ProductService.verifyStock(product).then(() => {
                    console.log(ProductService.update(product.id, {
                        stock: product.stock - product.amount
                    }))
                })
            })

            const newOrder = await this.db<Order>(table).insert({
                user: order.user,
                total: order.total,
                delivery_status: order.delivery_status,
                payment_status: order.payment_status,
            })

            console.log('newOrder: ', newOrder[0])

            await this.db<OrderProduct>('order_products').insert(products.map(
                product => ({
                    order_id: newOrder[0],
                    product_id: product.id,
                    amount: product.amount,
                    unit_price: product.price || product.unit_price
                })
            ))

            return newOrder[0]
        } catch (err) {
            throw err
        }
    }

    async findOrder(id): Promise<Order> {
        try {
            const item = this.db<Order>(table).where({ id }).first()
            return item
        } catch (err) {
            console.error(`Erro ao selecionar item em ${table}: `, err)
            throw err
        }
    }

    async findOrderProducts(id) {
        try {
            const dbOrderProducts = await this.db<OrderProduct>('order_products').where({ order_id: id })

            const orderProducts = await ProductService.findMany('id', dbOrderProducts.map(({ product_id }) => product_id))

            const result = []

            dbOrderProducts.map(orderProduct => {
                const product = orderProducts.find(({ id }) => id === orderProduct.product_id)

                result.push({
                    unit_price: orderProduct.unit_price,
                    amount: orderProduct.amount,
                    ...product
                })
            })

            return result
        } catch (err) {
            console.error(`Erro ao consultar produtos do pedido #${id}: `, err)
            throw err
        }
    }

    getUserOrders(id) {
        try {
            const orders = this.db(table).where({ user: id })
            return orders
        } catch (err) {
            console.error('Erro ao selecionar pedidos do usuário: ', err)
            throw err
        }
    }
}

export default new OrderService()