import DefaultService from '@/services/default'
import { Session } from '@/types/Session'

const table: string = 'sessions'

export class SessionService extends DefaultService<Session> {

    constructor() {
        super(table)
    }
}

export default new SessionService()