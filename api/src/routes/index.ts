import userRouter, { usersRouter } from '@/routes/users'
import authRouter from '@/routes/auth'

export const installRoutes = (app) => {
    // users
    app.use("/user", userRouter)
    app.use("/users", usersRouter)

    // session authentication
    app.use("/auth", authRouter)
}