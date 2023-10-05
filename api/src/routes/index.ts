import userRouter, { usersRouter } from '@/routes/users'
import { isAdmin } from '@/middlewares/auth'
import authRouter from '@/routes/auth'

export const installRoutes = (app) => {
    // users
    app.use('/user', userRouter)
    app.use('/users', isAdmin, usersRouter)

    // session authentication
    app.use('/auth', authRouter)
    
}