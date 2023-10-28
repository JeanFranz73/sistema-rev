import { userRouter, usersRouter } from '@/routes/users'
import { productRouter, productsRouter } from '@/routes/products'
import authRouter from '@/routes/auth'

export const installRoutes = (app) => {
    // session authentication
    app.use('/auth', authRouter)
        
    // users
    app.use('/user', userRouter)
    app.use('/users', usersRouter)
    
    // products
    app.use('/product', productRouter)
    app.use('/products', productsRouter)
}