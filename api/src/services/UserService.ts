import DefaultService from '@/services/default'
import type User from '@/types/User'

const table: string = 'users'

class UserService extends DefaultService<User> {

    constructor() {
        super(table)
    }

    findByUsername(username) {
        try {
            const user = this.db<User>(table).where({ username }).first()
            return user
        } catch (err) {
            console.error(`Erro ao selecionar item em ${table}: `, err)
            throw err
        }
    }

    getUserRoles() {
        try {
            const roles = this.db('user_roles').select()
            return roles
        } catch (err) {
            console.error(`Erro ao selecionar selecionar cargos de usuário: `, err)
            throw err
        }
    }
}

export default new UserService()