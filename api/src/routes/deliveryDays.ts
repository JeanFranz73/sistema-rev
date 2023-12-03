import { Router } from 'express'
import { isAdmin, isLoggedIn } from '@/middlewares/auth'
import DeliveryDayController from '@/controllers/DeliveryDayController'
import { DeliveryDay } from '@/types/DeliveryDay'

const router = Router()

router.get('/', isAdmin, async (req, res) => {
    try {
        const deliveryDays: DeliveryDay[] = await DeliveryDayController.findAll()

        if (!deliveryDays) {
            res.status(404).json({
                message: 'Dias de entrega não encontrados'
            })
        }

        res.status(200).json(deliveryDays)
    } catch (err) {
        console.error('Erro ao selecionar dia de entrega: ', err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.post('/new', isAdmin, async (req, res) => {
    const newDeliveryDay = req.body

    delete newDeliveryDay.active

    try {
        const deliveryDay = await DeliveryDayController.add(newDeliveryDay)

        if (!deliveryDay) {
            res.status(404).json({
                message: 'Dia de entrega não encontrado'
            })
        }

        res.status(201).json(deliveryDay)
    } catch (err) {
        console.error('Erro ao adicionar dia de entrega: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id

    try {
        const deliveryDay: DeliveryDay = await DeliveryDayController.find(id)

        if (!deliveryDay) {
            res.status(404).json({
                message: 'Dia de entrega não encontrado'
            })
        }

        res.status(200).json(deliveryDay)
    } catch (err) {
        console.error('Erro ao selecionar dia de entrega: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.patch('/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const newDeliveryDay = req.body

    try {
        const deliveryDay = await DeliveryDayController.edit(id, newDeliveryDay)

        res.status(200).json(deliveryDay)
    } catch (err) {
        console.error('Erro ao selecionar dia de entrega: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

export const deliveryDayRouter = router