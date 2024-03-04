// import http from "http"
import express from 'express'
import timeout from 'connect-timeout'
import CartaoRouters from '../src/Routers/CartaoRouters.js'
import { createHandler } from 'azure-function-express'

const app = express();

app.use(timeout(10000))

app.get('/', function (req, res) {
    res.send(`
    [LTI - Iniciativa Robôs de Russas]
    - Project: RUBOT
    - Status: Online
    - Version: 2.2.0
    `)
})

app.use('/cartao', CartaoRouters)

export default createHandler(app)