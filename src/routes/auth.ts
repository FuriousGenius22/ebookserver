import { Router } from "express"

const authRouter = Router()

authRouter.get('/generate-link', (req, res) => {
    res.send("<h1>This is my app</h1>")
})

export default authRouter