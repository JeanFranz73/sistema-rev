require('dotenv').config()

export default {
    db: {
        client: 'mysql2',
        secret: process.env.SECRET_KEY,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'sistema_rev'
        }
    }
}
