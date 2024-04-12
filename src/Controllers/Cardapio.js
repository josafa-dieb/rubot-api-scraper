import getCardapio from '../API/ScrappyCardapio.js'

export default async (request, response) => {
    getCardapio(request.body.campus, request.body.data)
        .then(res => response.status(200).send(res))
}