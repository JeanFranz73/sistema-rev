import DefaultService from '@/services/default'
import type SessionType from '@/types/Session'

const table: string = 'sessions'

class SessionService extends DefaultService<SessionType> {

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

export default new SessionService()