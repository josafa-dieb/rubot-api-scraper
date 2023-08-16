import axios from 'axios'
import * as cheerio from 'cheerio'
import FormData from 'form-data'
import fetch from 'node-fetch'

// Nao espere codigo limpo para scrappy dos sites da STI
export default function GetPaymentLinkPagTesouro(matricula, cartao, quantidade) {

    const url = "https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf"


    return axios.get(url, { withCredentials: true })
        .then(function (response) {
            const cookie = response.headers['set-cookie']
            const $ = cheerio.load(response.data)
            const input_data = Array.from($("input")).map(input => Object.values([input.attribs.name, input.attribs.value]))
            return {
                cookie: cookie,
                inputs: input_data
            }
        }).then(async function (next) {

            const inputs = Array.from(next.inputs)
            const form_key = inputs[0][0]
            const form_value = inputs[0][1]
            const cartao_key = inputs[1][0]
            const cartao_value = cartao
            const matricula_key = inputs[2][0]
            const matricula_value = matricula
            const consultar_key = inputs[3][0]
            const consultar_value = inputs[3][1]
            const view_state_key = inputs[4][0]
            const view_state_value = inputs[4][1]
            const cookie = `${next.cookie}`.split(';')[0]

            const formData = new FormData()
            formData.append(form_key, form_value)
            formData.append(cartao_key, cartao_value)
            formData.append(matricula_key, matricula_value)
            formData.append(consultar_key, consultar_value)
            formData.append(view_state_key, view_state_value)

            const conf = {
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Content-Type": "multipart/form-data; boundary=" + formData._boundary,
                    'Cookie': cookie,
                    "Host": "si3.ufc.br",
                    "Origin": "https://si3.ufc.br",
                    "Pragma": "no-cache",
                    "Referer": "https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf",
                    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "Windows",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-User": "?1",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37"
                }

            }

            return await axios.post(url, formData, conf).then(async response => {

                const $ = cheerio.load(response.data)
                const error = $("#painel-erros > ul > li").text()

                if (error) {
                    return {
                        error: true,
                        message: error
                    }
                }

                await fetch("https://si3.ufc.br/public/jsp/restaurante_universitario/gera_gru_restaurante.jsf", {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                        "Accept": "*/*",
                        "Cookie": cookie,
                        "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer": "https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf",
                    "body": "AJAXREQUEST=j_id_jsp_540432864_0&form=form&form%3AqtdCreditos=" + quantidade + "&javax.faces.ViewState=j_id2&form%3Aj_id_jsp_540432864_3=form%3Aj_id_jsp_540432864_3&",
                    "method": "POST",
                    "mode": "cors"
                })
                await fetch("https://si3.ufc.br/public/jsp/restaurante_universitario/gera_gru_restaurante.jsf", {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                        "Accept": "*/*",
                        "Cookie": cookie,
                        "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer": "https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf",
                    "body": "AJAXREQUEST=j_id_jsp_540432864_0&form=form&form%3AqtdCreditos=" + quantidade + "&javax.faces.ViewState=j_id2&form%3Aj_id_jsp_540432864_3=form%3Aj_id_jsp_540432864_3&",
                    "method": "POST",
                    "mode": "cors"
                })
                return await fetch("https://si3.ufc.br/public/jsp/restaurante_universitario/gera_gru_restaurante.jsf", {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                        "Cookie": cookie,
                        "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Upgrade-Insecure-Requests": "1",
                        "Sec-Fetch-Dest": "document",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-User": "?1"
                    },
                    "referrer": "https://si3.ufc.br/public/jsp/restaurante_universitario/consulta_comensal_ru.jsf",
                    "body": "modalForm2=modalForm2&modalForm2%3AbtConfirmarPagtesouro=Estou+ciente&javax.faces.ViewState=j_id2",
                    "method": "POST",
                    "mode": "cors"
                }).then(res => res.text()).then(res => cheerio.load(res)).then(html => html("iframe")[0].attribs.src).then(link => {
                        return {
                            error: false,
                            message: "✅ <b>Pagamento gerado! clique no botão abaixo para prosseguir.</b>\n\nVocê será redirecionado para o site do PagTesouro com uma sessão do seu pagamento. Verifique se seus dados estão corretos e não atualize a página nem troque de janela durante o pagamento.\n\nFormas de pagamento disponíveis\n💠 Pix\n💳 Cartão de crédito (Mercado Pago, PicPay)\n",
                            link: link
                        }
                }).catch(err => {
                    return {
                        error: true,
                        message: "Pagamentos temporariamente indisponíves, tente novamente mais tarde!"
                    }
                })

            }).catch(err => {
                return {
                    error: true,
                    message: "Pagamentos temporariamente indisponíves, tente novamente mais tarde!"
                }
            })
        }).catch(err => {
            return {
                error: true,
                message: "Pagamentos temporariamente indisponíves, tente novamente mais tarde!"
            }
        })


}
