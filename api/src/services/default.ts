import db from '@/helpers/db'

class DefaultService<T> {

    private table: string
    protected db = db

    constructor(table: string) {
        this.table = table
    }

    findAll() {
        try {
            const items = db<T>(this.table).select()
            return items
        } catch (err) {
            console.error(`Erro ao selecionar itens em ${this.table}: `, err)
            throw err
        }
    }

    findMany(field, value) {
        try {
            const items = db<T>(this.table).whereIn(field, value)
            return items
        } catch (err) {
            console.error(`Erro ao selecionar itens em ${this.table}: `, err)
            throw err
        }
    }

    findById(id) {
        try {
            const item = db(this.table).where({ id }).first()
            return item
        } catch (err) {
            console.error(`Erro ao selecionar item em ${this.table}: `, err)
            throw err
        }
    }

    findBy(field, value) {
        try {
            console.log('procurando especificamente por campo', field, 'com valor', value)
            const item = db(this.table).where(field, value).first()
            return item
        } catch (err) {
            console.error(`Erro ao selecionar item em ${this.table}: `, err)
            throw err
        }
    }

    create(data) {
        try {
            const item = db(this.table).insert(data)
            return item
        } catch (err) {
            console.error(`Erro ao inserir item em ${this.table}: `, err)
            throw err
        }
    }

    update(id, data) {
        try {
            const item = db(this.table).where({ id }).update(data)
            return item
        } catch (err) {
            console.error(`Erro ao atualizar item em ${this.table}: `, err)
            throw err
        }
    }

    delete(id) {
        try {
            const item = db(this.table).where({ id }).del()
            return item
        } catch (err) {
            console.error(`Erro ao deletar item em ${this.table}: `, err)
            throw err
        }
    }
}

export default DefaultService