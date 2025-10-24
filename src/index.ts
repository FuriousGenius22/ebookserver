import express from "express";
import authRouter from "./routes/auth";
import "@/db/connect"

const app = express();

const port = process.env.PORT || 8989;

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use("/auth", (req, res, next) => {
    req.on("data", (chunk) => {
        req.body = JSON.parse(chunk);
        next();
    });
});

app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`The server is running on the port http://localhost:${port}`);
});
