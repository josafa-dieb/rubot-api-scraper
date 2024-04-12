import express from "express";
import Controllers from "../Services/Controllers.js";

const router = express.Router()

router.use(express.json())

router.post('/', Controllers.Cardapio)

export default router