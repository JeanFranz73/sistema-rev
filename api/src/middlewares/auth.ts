import config from '@/helpers/config'
import * as jwt from 'jsonwebtoken'

const verify = (token, req, res) => {
    if (typeof token !== 'undefined') {
        try {
            const bearerToken = token.split(' ')[1]
            jwt.verify(bearerToken, config.db.secret)
            return true
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
    return false
}

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.get('authorization')
    if (verify(bearerHeader, req, res)) {
        next()
    }
}

export const isAdmin = (req, res, next) => {
    const bearerHeader = req.get('authorization')
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