import express from "express";
import Controllers from "../Services/Controllers.js";
import Middlewares from "../Services/Middlewares.js";

const router = express.Router()

router.use(express.json())

router.use(Middlewares)

router.post('/', Controllers.Cartao)

router.post('/recarga', Controllers.Recarga)

router.post('/historico', Controllers.Historico)

router.post('/historico/recargas', Controllers.HistoricoRecargas)

router.post('/historico/refeicoes', Controllers.HistoricoRefeicoes)

export default router