import { Router } from 'express'
import { verifyToken } from '@/middlewares/auth'
import User from '@/controllers/UserController'
import UserType from '@/types/User'

const manyRouter = Router()

manyRouter.get('/', async (req, res) => {
    try {
        let users: UserType[] = await User.findAll()

        if (!users) {
            res.status(404).json({
                message: "Usuários não encontrados"
            })
        }

        res.status(200).json(users)
    } catch (err) {
        console.error(`Erro ao selecionar usuários: `, err)
        res.status(500).json({
            message: err.message
        })
    }
})

export const usersRouter = manyRouter

const router = Router()

router.post('/new', async (req, res) => {
    const newUser = req.body

    delete newUser.role
    delete newUser.active

    try {
        let user = await User.add(newUser)

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        res.status(201).json(user)
    } catch (err) {

        console.error(`Erro ao adicionar usuário: `, err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.get("/", async (req, res) => {
    res.status(422).json({
        message: "Usuário não especificado"
    })
})

router.patch('/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    const newUser = req.body

    try {
        const user = await User.edit(id, newUser)

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        delete user.password

        res.status(200).json(user)
    } catch (err) {
        console.error(`Erro ao selecionar usuário: `, err)
        res.status(500).json({
            message: "Erro ao selecionar usuário"
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        let user: UserType = await User.find(id)

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        delete user.password

        res.status(200).json(user)
    } catch (err) {
        console.error(`Erro ao selecionar usuário: `, err)
        res.status(500).json({
            message: "Erro ao selecionar usuário"
        })
    }
})

export default router