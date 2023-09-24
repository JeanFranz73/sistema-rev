import { Router } from 'express'
import User from '@/services/User'

const router = Router()

router.get("/", async (req, res) => {
    res.status(422).json(
        {
            message: "Usuário não especificado"
        }
    )
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        let user = await User.findById(id) ?? await User.findByUsername(id)

        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        user.password = undefined
        res.status(200).json(user)
    } catch (err) {
        console.error(`Erro ao selecionar usuário: `, err)
        res.status(500).json({
            message: "Erro ao selecionar usuário"
        })
    }
})

export default router