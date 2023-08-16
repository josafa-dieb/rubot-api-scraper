export default (request, response) => {
    response.status(200).send({
        cartao: request.infoCard.cartao,
        matricula: request.infoCard.matricula,
        aluno: request.infoCard.aluno,
        saldo: request.infoCard.saldo
    })
}