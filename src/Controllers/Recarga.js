import GetPaymentLinkPagTesouro from "../API/ScrappyPagTesouro.js"

export default async (request, response) => {
    if (!request.body.quantidade) {
        response.status(400).send({
            message: "Voce precisa informar a quantidade de creditos"
        })
        return
    }
    const {matricula, cartao, quantidade} = request.body
    const paymentData = await GetPaymentLinkPagTesouro(matricula, cartao, quantidade)
    response.send(paymentData)
}