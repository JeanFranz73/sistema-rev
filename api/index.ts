import * as express from 'express'
import * as morgan from 'morgan'

const app = express()
const port = 8000

import usersRouter from '@/routes/users'

app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/user", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})