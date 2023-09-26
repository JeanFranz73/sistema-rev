import { Router } from 'express'
import SessionController from '@/controllers/SessionController'

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

export default router