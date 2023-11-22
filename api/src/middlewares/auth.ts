import { verifyToken, isUserActive, isAdmin as admin } from '@/helpers/auth'

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
    try {
        const bearerHeader = req.get('authorization')

        if (admin(bearerHeader)) {
            next()
        }
    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}