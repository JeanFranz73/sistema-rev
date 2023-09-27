import DefaultService from '@/services/default'
import type SessionType from '@/types/Session'

const table: string = 'sessions'

class SessionService extends DefaultService<SessionType> {

    constructor() {
        super(table)
    }
}

export default new SessionService()