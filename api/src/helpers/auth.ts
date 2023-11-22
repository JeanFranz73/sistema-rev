
import config from '@/helpers/config'
import UserController from '@/controllers/UserController'
import { Role } from '@/types/Role'
import * as jwt from 'jsonwebtoken'

export async function isUserActive(token: string): Promise<boolean> {
    const { id } = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).user
    const user = await UserController.find(id)
    return user.active
}

export function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, config.db.secret)
        return true
    } catch (err) {
        return false
    }
}

export function isAdmin(bearerHeader) {
    
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]

        if (verifyToken(bearerToken)) {
            const user = JSON.parse(Buffer.from(bearerToken.split('.')[1], 'base64').toString()).user
            if (user.role === Role.ADMIN) {
                return true
            } else {
                throw new Error('Você não tem permissão para acessar essa rota')
            }
        } else {
            throw new Error('Token inválido')
        }
    } else {
        throw new Error('Token não especificado')
    }
}