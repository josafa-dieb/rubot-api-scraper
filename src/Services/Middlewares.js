import API from '../API/ScrappySigaa.js'

const Middlewares = async (req, res, next) => {
    if (!req.timedout) {
        if (req.body.matricula && req.body.cartao) {
            const { cartao, matricula } = req.body
            req.infoCard = await new API(cartao, matricula).InfoCard()
            if (req.infoCard.error) {
                response.status(400).send({
                    error: true,
                    message: "Nao foi possivel carregar as informacoes do cartao"
                })
            } else {
                next()
            }

        } else {
            res.status(400).send({
                error: 400,
                message: "Bad Request"
            })
        }
    } else {
        res.status(408).send('RequestTimeOut')
        console.log("Connection Timeout")
    }
}
export default Middlewares