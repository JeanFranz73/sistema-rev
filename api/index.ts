import * as express from 'express'
import * as morgan from 'morgan'

const app = express()
const port = 8000

import { installRoutes } from "@/routes"

app.use(morgan('dev'))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" })
})

installRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})