import * as bcrypt from 'bcrypt'

import User, { UserRoleType as UserRole } from '@/types/User'
import UserService from '@/services/UserService'

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

        const userId = UserService.create(user)

        if (userId) {
            return await UserService.findById(userId)
        }

        throw new Error('Erro ao adicionar usuário')
    }

    async edit(userId: number | string, user: User) {
        const dbUser = await this.find(userId)

        console.log(userId)

        delete user.password
        delete user.active

        await UserService.update(dbUser.id, user)

        return {
            ...dbUser,
            ...user
        }
    }

    async editPassword(userId: number | string, oldPassword: string, newPassword: string) {
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
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await UserService.update(user.id, { password: hashedPassword})
    }
}

export default new UserController()