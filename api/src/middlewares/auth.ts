import config from '@/helpers/config'
import * as jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        try {
            const bearerToken = bearerHeader.split(' ')[1]
            jwt.verify(bearerToken, config.db.secret)
            req.token = bearerToken
            next()
        } catch (err) {
            res.status(403).json({
                message: "Token inválido"
            })
        }
    } else {
        res.status(403).json({
            message: "Token não especificado"
        })
    }
}

export const isAdmin = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        try {
            const bearerToken = bearerHeader.split(' ')[1]
            jwt.verify(bearerToken, config.db.secret)
            req.token = bearerToken
            const { role } = JSON.parse(Buffer.from(bearerHeader.split(' ')[1].split('.')[1], 'base64').toString()).user
            if (role === 1) {
                next()
            } else {
                res.status(403).json({
                    message: "Você não tem permissão para acessar essa rota"
                })
            }
        } catch (err) {
            res.status(403).json({
                message: "Token inválido"
            })
        }
    } else {
        res.status(403).json({
            message: "Token não especificado"
        })
    }
}