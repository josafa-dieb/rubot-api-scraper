import swagger from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import express from 'express'

const swaggerSpec = JSON.parse(fs.readFileSync(path.resolve('./swagger-spec.json')).toString('utf-8'))

const router = express.Router()

router.use('/', swagger.serve, swagger.setup(swaggerSpec))

export default router