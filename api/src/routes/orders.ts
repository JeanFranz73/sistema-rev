import { Router } from 'express'
import { isAdmin, isLoggedIn } from '@/middlewares/auth'
import { isAdmin as admin } from '@/helpers/auth'
import OrderController from '@/controllers/OrderController'
import { Order } from '@/types/Order'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const orders: Order[] = await OrderController.findAll()

        if (!orders) {
            res.status(404).json({
                message: 'Usuários não encontrados'
            })
        }

        res.status(200).json(orders)
    } catch (err) {
        console.error('Erro ao selecionar usuários: ', err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.post('/new', async (req, res) => {
    const newOrder = req.body

    try {
        const order: Order = await OrderController.add(newOrder)

        if (!order) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        res.status(201).json(order)
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

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const order: Order = await OrderController.find(id)

        if (!order) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        res.status(200).json(order)
    } catch (err) {
        console.error('Erro ao selecionar usuário: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const newOrder = req.body

    try {
        if (!admin(req.get('authorization'))) {
            delete newOrder.role
            delete newOrder.active
        }
        const order: Order = await OrderController.edit(id, newOrder)

        if (!order) {
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }

        res.status(200).json(order)
    } catch (err) {
        console.error('Erro ao selecionar usuário: ', err)
        res.status(400).json({
            message: 'Erro ao selecionar usuário'
        })
    }
})

export const orderRouter = router