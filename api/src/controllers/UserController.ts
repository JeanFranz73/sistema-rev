import * as bcrypt from "bcrypt"

import UserType from "@/types/User"
import UserService from "@/services/UserService"

class UserController {
    async findAll(): Promise<UserType[]> {
        let users: UserType[] = await UserService.findAll()

        users.forEach(user => {
            delete user.password
        })

        return users
    }

    async find(id: number | string): Promise<UserType> {
        let user: UserType = await UserService.findById(id) ?? UserService.findByUsername(id)

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        return user
    }

    async add(user: UserType) {
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

    async edit(userId: number | string, user: UserType) {
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