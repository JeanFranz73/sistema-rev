import { Router } from 'express'
import Session from '@/controllers/SessionController'

const router = Router()

router.post('/', async (req, res) => {
    const credentials = req.body
    try {
        let session = await Session.create(credentials)

        if (!session) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        res.status(201).json(session)
    } catch (err) {
        console.error(err)
        res.status(203).json({
            message: 'Usuário e senha não conferem'
        })
    }
})

export default router