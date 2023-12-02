import { Order } from '@/types/Order'
import OrderService from '@/services/OrderService'
import { Product } from '@/types/Product'

class OrderController {
    async findAll(): Promise<Order[]> {
        const orders: Order[] = await OrderService.findAll()

        return orders
    }

    async find(id: number | string): Promise<Order> {
        const order: Order = await OrderService.findOrder(id)

        if (!order) {
            throw new Error('Produto não encontrado')
        }

        const products: Product[] = await OrderService.findOrderProducts(id)

        return {
            ...order,
            products
        }
    }

    async add(order: Order) {
        const orderId = await OrderService.create(order)

        if (orderId) {
            return await OrderService.findById(orderId[0])
        }
    }

    async edit(orderId: number | string, order: Order) {

        const dbOrder: Order = await this.find(orderId)

        if (!dbOrder) {
            throw new Error('Usuário não encontrado')
        }

        await OrderService.update(dbOrder.id, order)

        return {
            ...dbOrder,
            ...order
        }
    }
}

export default new OrderController()