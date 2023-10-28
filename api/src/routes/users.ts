import { Router } from 'express'
import { isAdmin, isLoggedIn } from '@/middlewares/auth'
import UserController from '@/controllers/UserController'
import { UserType } from '@/types/User'

const manyRouter = Router()

manyRouter.get('/', async (req, res) => {
    try {
        const users: UserType[] = await UserController.findAll()

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

router.get('/', async (req, res) => {
    res.status(422).json({
        message: 'Usuário não especificado'
    })
})

router.post('/new', async (req, res) => {
    const newUser = req.body

    delete newUser.role
    delete newUser.active

    try {
        const user: UserType = await UserController.add(newUser)

        if (!user) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        delete user.password

        res.status(201).json(user)
    } catch (err) {
        console.error('Erro ao criar usuário: ', err)

        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({
                message: 'Nome de usuário já existente'
            })
        } else {
            res.status(400).json({
                message: 'Erro ao criar usuário'
            })
        }
    }
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id

    try {
        const user: UserType = await UserController.find(id)

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

router.patch('/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const newUser = req.body

    try {
        const user: UserType = await UserController.edit(id, newUser)

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

router.post('/:id/change-password', isAdmin, async (req, res) => {
    const id = req.params.id
    const { oldPassword, password } = req.body

    try {
        await UserController.editPassword(id, oldPassword, password)

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

export const userRouter = router