import axios from 'axios'
import { load } from 'cheerio'

function getTableContent($, tableClass) {
    const res = {}

    $(`table.${tableClass} td:last-child`).each((i, elem) => {
        const key = elem.attribs['class']
        res[key] = []
        
        elem.childNodes.forEach(childElem => {
            if (!childElem.children || childElem.children.length < 1)
                return
            
            if (childElem.attribs['class'] === 'desc') {
                res[key].push(childElem.children[0].data)
            } else {
                res[key][res[key].length - 1] = res[key].at(-1).concat(childElem.children[0].data)
            }
        })
    })

    return res
}

export default async function getCardapio(campus, date) {
    const campusCodes = {
        'fortaleza': 1,
        'russas': 3,
        'sobral': 4,
        'quixada': 5,
        'crateus': 6
    }

    const webPage = await axios.get(`https://www.ufc.br/restaurante/cardapio/${campusCodes[campus]}-restaurante-universitario-de-${campus}/${date ?? ''}`)

    const $ = load(webPage.data)

    return {
        almoco: getTableContent($, 'almoco'),
        jantar: getTableContent($, 'jantar')
    }
}