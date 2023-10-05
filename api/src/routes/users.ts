import { Router } from 'express'
import { isLoggedIn } from '@/middlewares/auth'
import UserController from '@/controllers/UserController'
import User from '@/types/User'

const manyRouter = Router()

manyRouter.get('/', async (req, res) => {
    try {
        const users: User[] = await UserController.findAll()

        if (!users) {
            res.status(404).json({
                message: 'Usuários não encontrados'
            })
        }

        res.status(200).json(users)
    } catch (err) {
        console.error('Erro ao selecionar usuários: ', err)
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
        const user = await UserController.add(newUser)

        if (!user) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        delete user.password

        res.status(201).json(user)
    } catch (err) {

        console.error('Erro ao adicionar usuário: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/', async (req, res) => {
    res.status(422).json({
        message: 'Usuário não especificado'
    })
})

router.patch('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id
    const newUser = req.body

    try {
        const user = await UserController.edit(id, newUser)

        if (!user) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        delete user.password

        res.status(200).json(user)
    } catch (err) {
        console.error('Erro ao selecionar usuário: ', err)
        res.status(400).json({
            message: 'Erro ao selecionar usuário'
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user: User = await UserController.find(id)

        if (!user) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        delete user.password

        res.status(200).json(user)
    } catch (err) {
        console.error('Erro ao selecionar usuário: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/:id/change-password', async (req, res) => {
    const id = req.params.id
    const { oldPassword, newPassword } = req.body

    try {
        await UserController.editPassword(id, oldPassword, newPassword)

        res.status(200).json({
            message: 'Senha alterada com sucesso'
        })
    } catch (err) {
        console.error('Erro ao alterar senha: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})


export default router