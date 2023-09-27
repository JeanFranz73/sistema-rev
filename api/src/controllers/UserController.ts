import * as bcrypt from "bcrypt"

import User, { UserRoleType as UserRole } from "@/types/User"
import UserService from "@/services/UserService"

class UserController {
    async findAll(): Promise<User[]> {
        let roles: UserRole[] = await UserService.getUserRoles()
        let users: User[] = await UserService.findAll()

        users.forEach(user => {
            delete user.password
            user.role = roles.find(role => role.id == user.role) ?? user.role
        })

        return users
    }

    async find(id: number | string): Promise<User> {
        let user: User = await UserService.findById(id) ?? UserService.findByUsername(id)

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        return user
    }

    async add(user: User) {
        if (user.password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }

        let userId = UserService.create(user)

        if (userId) {
            return await UserService.findById(userId)
        }

        throw new Error("Erro ao adicionar usuário")
    }

    async edit(userId: number | string, user: User) {
        const dbUser = await this.find(userId)

        console.log(userId)

        delete user.password

        await UserService.update(dbUser.id, user)

        return {
            ...dbUser,
            ...user
        }
    }

}

export default new UserController()