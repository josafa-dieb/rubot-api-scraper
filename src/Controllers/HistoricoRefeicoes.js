export default async (request, response) => {
    const responseBody = Array.from(request.infoCard.historico).filter(object => object.operacao == "Utilização do Cartão")
    response.status(200).send(responseBody)
}