import DefaultService from '@/services/default'
import { SessionType } from '@/types/Session'

const table: string = 'sessions'

export class SessionService extends DefaultService<SessionType> {

    constructor() {
        super(table)
    }
}

export default new SessionService()