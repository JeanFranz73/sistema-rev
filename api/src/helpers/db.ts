import knex from 'knex'
import config from '@/helpers/config'

export default knex(config.db)