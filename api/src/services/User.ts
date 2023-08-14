import DefaultService from '@/services/default';
import type Us from '@/types/User';

const table = 'users';

class User extends DefaultService<Us> {

    constructor() {
        super(table);
    }

    findByUsername(username) {
        try {
            const user = this.db(table).where({ username }).first();
            return user;
        } catch (err) {
            console.error(`Erro ao selecionar item em ${table}: `, err);
            throw err;
        }
    }
}

export default new User();