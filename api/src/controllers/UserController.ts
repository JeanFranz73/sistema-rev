import * as bcrypt from 'bcrypt'

import { User, UserRole } from '@/types/User'
import UserService from '@/services/UserService'
import OrderService from '@/services/OrderService'

class UserController {
    async findAll(): Promise<User[]> {
        const roles: UserRole[] = await UserService.getUserRoles()
        const users: User[] = await UserService.findAll()

        users.forEach(user => {
            delete user.password
            user.role = roles.find(role => role.id == user.role) ?? user.role
        })

        return users
    }

    async find(id: number | string): Promise<User> {
        const user: User = await UserService.findById(id) ?? UserService.findByUsername(id)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return user
    }

    async add(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }

        const userId = await UserService.create(user)

        if (userId) {
            return await UserService.findById(userId[0])
        }
    }

    async edit(userId: number | string, user: User) {

        const dbUser: User = await this.find(userId)

        if (!dbUser) {
            throw new Error('Usuário não encontrado')
        }

        if (user.password) {
            if (await bcrypt.compare(user.oldPassword, dbUser.password)) {
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
            } else {
                throw new Error('Senha incorreta')
            }
        }

        await UserService.update(dbUser.id, user)

        return {
            ...dbUser,
            ...user
        }
    }

    async editPassword(userId: number | string, oldPassword: string, password: string) {
        const user = await this.find(userId)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        if (user.password) {
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

            if (!isPasswordValid) {
                throw new Error('Senha incorreta')
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await UserService.update(user.id, { password: hashedPassword})
    }

    async changeStatus(userId: number | string, active: boolean) {
        const user = await this.find(userId)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        await UserService.update(user.id, { active })
    }

    async getUserOrders(userId: number | string) {
        const user = await this.find(userId)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        return await OrderService.getUserOrders(user.id)
    }
}

export default new UserController()