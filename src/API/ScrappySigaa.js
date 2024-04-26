import * as cheerio from "cheerio";
import fetch from "node-fetch";

export default class API {

    constructor(cartao, matricula) {
        this.cartao = cartao;
        this.matricula = matricula;
    }

    ScrapyData(html) {
        if (typeof html === 'undefined') {
            return {
                error: true,
                message: 'Api de consulta sobrecarregada'
            };
        }

        return cheerio.load(html);
    }

    async InfoCard() {
        return new Promise((resolve, reject) => {
            const data = new URLSearchParams()

            data.append('codigoCartao', this.cartao)
            data.append('matriculaAtreladaCartao', this.matricula)

            fetch('https://si3.ufc.br/public/restauranteConsultarSaldo.do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            })
                .then(res => res.text())
                .then(res => {
                    const $ = this.ScrapyData(res);
                    if (typeof ($) === `object`) {
                        return reject($)
                    }
                    const saldo = $('#corpo > table:nth-child(6) > tbody > tr.linhaImpar > td:nth-child(2)').text();
                    const aluno = $('#corpo > table:nth-child(6) > tbody > tr.linhaPar > td:nth-child(2)').text();
                    let erro_message = $("#mensagem-erro").text();

                    return (erro_message) ? resolve({
                        error: true,
                        message: erro_message
                    }) : resolve({
                        cartao: this.cartao,
                        matricula: this.matricula,
                        aluno: aluno,
                        saldo: parseInt(saldo),
                        historico: $('table.listagem:nth-child(8) > tbody:nth-child(3) tr').map((i, el) => {
                            let children = $(el).children().toArray();
                            return {
                                data: $(children[0]).text(),
                                operacao: `${$(children[1]).text()}`.trim().replace(/\n/g, '').replace(/\t/g, ''),
                                detalhes: `${$(children[2]).text()}`.trim().replace(/\n/g, '').replace(/\t/g, '')
                            };
                        }).get()
                    });
                })
                .catch(err => reject(err))
        })
    }

}
