import express from "express";
import authRouter from "./routes/auth";

const app = express()

const port = 3000;

app.use('/auth', authRouter);

app.listen(port, () => { console.log(`The server is running on the port http://localhost:${port}`) })
