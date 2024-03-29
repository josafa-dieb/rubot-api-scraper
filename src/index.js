import express from "express";
import http from "http"
import timeout from 'connect-timeout'
import CartaoRouters from './Routers/CartaoRouters.js'

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

const options = {}

http.createServer(options, app).listen(process.env.PORT || 3000, () => {
    console.log(`
    [LTI - Iniciativa Robôs de Russas]
    - Project: RUBOT
    - Status: Online
    - Version: 2.2.0
    `);
})