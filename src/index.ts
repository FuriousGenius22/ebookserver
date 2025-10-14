import express, { response } from "express";
import { request } from "http";

const app = express();

const port = process.env.PORT || 8989
app.get('/', (request, response) =>{
    response.send('<h1>Hello this is my very first server</h1>')
})

app.get('/apple', (request, response) =>{
    response.send('<h1>Apple is red</h1>')
})

app.listen(port, () =>{console.log(`App is running on port http://localhost:${port}`)})