const db = require('#helpers/db.js')

class User {
    constructor() {
        this.table = 'users';
    }

    findAll() {
        try {
            const users = db(this.table).select();
            return users;
        } catch (err) {
            console.error(`Erro ao selecionar usuários: `, err);
            throw err;
        }
    }

    findById(id) {
        try {
            const user = db(this.table).where({ id }).fi();
            return user;
        } catch (err) {
            console.error(`Erro ao selecionar usuário: `, err);
            throw err;
        }
    }

    findByUsername(username) {
        try {
            const user = db(this.table).where({ username }).first();
            return user;
        } catch (err) {
            console.error(`Erro ao selecionar usuário: `, err);
            throw err;
        }
    }

    create(data) {
        try {
            const user = db(this.table).insert(data);
            return user;
        } catch (err) {
            console.error(`Erro ao inserir usuário: `, err);
            throw err;
        }
    }

    update(id, data) {
        try {
            const user = db(this.table).where({ id }).update(data);
            return user;
        } catch (err) {
            console.error(`Erro ao atualizar usuário: `, err);
            throw err;
        }
    }

    delete(id) {
        try {
            const user = db(this.table).where({ id }).del();
            return user;
        } catch (err) {
            console.error(`Erro ao deletar usuário: `, err);
            throw err;
        }
    }
}

module.exports = new User();