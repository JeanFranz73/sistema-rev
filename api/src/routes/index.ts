import { userRouter } from '@/routes/users'
import { productRouter } from '@/routes/products'
import { orderRouter } from '@/routes/orders'
import { deliveryDayRouter } from '@/routes/deliveryDays'

import authRouter from '@/routes/auth'

export const installRoutes = (app) => {
    app.use('/auth', authRouter)
    app.use(['/user', '/users'], userRouter)
    app.use(['/product', '/products'], productRouter)
    app.use(['/order', '/orders'], orderRouter)
    app.use('/delivery-day', deliveryDayRouter)
}