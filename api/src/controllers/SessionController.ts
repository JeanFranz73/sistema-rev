import config from '@/helpers/config'
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { Session } from '@/types/Session'
import UserController from '@/controllers/UserController'
import SessionService from '@/services/SessionService'
import { User } from '@/types/User'

class SessionController {
    async create(login): Promise<Session> {

        const { username, password } = login

        if (!username) {
            throw new Error('Usuário não especificado')
        }

        const user: User = await UserController.find(username)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        if (!user.active) {
            throw new Error('Usuário não está ativo no sistema')
        }

        if (user.password) {

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                throw new Error('Senha inválida')
            }
        } else {
            if (password) {
                throw new Error('Senha inválida')
            }
        }

        const token = sign({
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                email: user.email
            }
        }, config.db.secret, {
            expiresIn: '12h'
        })

        const session: Session = {
            token,
            user_id: user.id
        }

        if (await SessionService.create({
            token: token,
            user: user.id,
        })) {
            return session
        }
    }

    async find(token): Promise<Session> {
        const session = await SessionService.findBy('token', token)
        return session
    }
}

export default new SessionController()