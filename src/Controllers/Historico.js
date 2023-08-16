export default (request, response) => {
    response.status(200).send(request.infoCard.historico)
}