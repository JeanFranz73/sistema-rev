import { Router } from 'express'
import SessionController from '@/controllers/SessionController'
import { verifyToken } from '@/middlewares/auth'

const router = Router()

router.post('/', async (req, res) => {
    const credentials = req.body
    try {
        let session = await SessionController.create(credentials)

        if (!session) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        res.status(201).json(session)
    } catch (err) {
        console.error(err)
        res.status(401).json({
            message: 'Usuário ou senha incorretos'
        })
    }
})

router.get('/verify', verifyToken, async (req, res) => {
    try {
        let token = req.get('authorization').split(' ')[1]
        const session = await SessionController.find(token)

        if (!session) {
            res.status(404).json({
                message: "Sessão não encontrada"
            })
        }
        res.status(200).json(session)
    } catch (err) {
        res.status(401).json({
            message: 'Token inválido'
        })
    }
})

export default router