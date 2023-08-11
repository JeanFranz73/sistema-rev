const express = require('express')
const app = express()
const port = 8000
const usersRouter = require('#routes/users.js')

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/user", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})