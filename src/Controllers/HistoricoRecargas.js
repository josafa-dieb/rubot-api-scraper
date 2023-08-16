export default async (request, response) => {
    const responseBody = new Array()
    Array.from(request.infoCard.historico).filter(object => object.operacao == 'Compra de Créditos').forEach(object => {
        responseBody.push({
            Date: object.data,
            Operation: object.operacao,
            CurrentValue: object.detalhes.split("/")[1].replace(/[^0-9]/g, ""),
            RechargedValue: object.detalhes.split("/")[0].split(":")[1].replace(/[^0-9]/g, ""),
            LastValue: object.detalhes.split("/")[0].split(":")[2].replace(/[^0-9]/g, ""),
        })
    })
    response.status(200).send(responseBody)
}