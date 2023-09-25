import DefaultService from '@/services/default'
import type UserType from '@/types/User'

const table: string = 'users'

class UserService extends DefaultService<UserType> {

    constructor() {
        super(table)
    }

    findByUsername(username) {
        try {
            const user = this.db(table).where({ username }).first()
            return user
        } catch (err) {
            console.error(`Erro ao selecionar item em ${table}: `, err)
            throw err
        }
    }
}

export default new UserService()