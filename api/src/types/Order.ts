import { Product } from '@/types/Product'
import { User } from '@/types/User'

enum DeliveryStatus {
    PENDING = 1,
    DELIVERED = 2,
    CANCELLED = 3
}

enum PaymentStatus {
    PENDING = 1,
    PAID = 2,
    CANCELLED = 3
}

export type OrderProduct = {
    order_id: Order | number
    product_id: Product | number
    amount: number
    unit_price: number
}

export type Order = {
    id: number
    created: Date
    user: User | number
    total: number
    products: Product[]
    delivery_status: DeliveryStatus | number
    payment_status: PaymentStatus | number
}