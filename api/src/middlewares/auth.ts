import UserController from '@/controllers/UserController'
import config from '@/helpers/config'
import { Role } from '@/types/Role'
import * as jwt from 'jsonwebtoken'

function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, config.db.secret)
        return true
    } catch (err) {
        return false
    }
}

const isUserActive = async (token: string): Promise<boolean> => {
    const { id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).user
    const user = await UserController.find(id)
    return user.active
}

export const isLoggedIn = (req, res, next) => {
    const bearerHeader = req.get('authorization')

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]

        if (verifyToken(bearerToken)) {
            if (isUserActive(bearerToken)) {
                next()
            } else {
                res.status(403).json({
                    message: 'Usuário inativo'
                })
            }
        } else {
            res.status(403).json({
                message: 'Token inválido'
            })
        }
    } else {
        res.status(403).json({
            message: 'Token não especificado'
        })
    }
}

export const isAdmin = (req, res, next) => {
    const bearerHeader = req.get('authorization')

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]

        if (verifyToken(bearerToken)) {
            const { role } = JSON.parse(Buffer.from(bearerToken.split('.')[1], 'base64').toString()).user
            if (role === Role.ADMIN) {
                next()
            } else {
                res.status(403).json({
                    message: 'Você não tem permissão para acessar essa rota'
                })
            }
        } else {
            res.status(403).json({
                message: 'Token inválido'
            })
        }
    } else {
        res.status(403).json({
            message: 'Token não especificado'
        })
    }
}