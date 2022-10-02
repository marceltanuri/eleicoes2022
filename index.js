import fetch from 'node-fetch';


class Resultado {



    static async getResults() {


        const ufs = ["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"]
        const urls = ufs.map(uf => `https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/${uf}/${uf}-c0001-e000544-r.json`);
        const response = await Promise.all(urls.map(url => fetch(url)))
        await Promise.all(response.map(res => {
            try {
                res.json().then(data => {
                    const primeirosLugares = data.cand.filter(cand => { return cand.seq <= 3 }).sort((a, b) => {
                        return a.seq < b.seq?-1:1
                    })

                    let result = {
                        UF: data.cdabr,
                        Apuração: data.pst + "%",
                        Candidatos: [
                            {
                                "1o Lugar": primeirosLugares[0].nm,
                                "% dos votos": primeirosLugares[0].pvap + "%",
                                "Total de votos": primeirosLugares[0].vap
                            },
                            {
                                "2o Lugar": primeirosLugares[1].nm,
                                "% dos votos": primeirosLugares[1].pvap + "%",
                                "Total de votos": primeirosLugares[1].vap
                            },
                            {
                                "3o Lugar": primeirosLugares[2].nm,
                                "% dos votos": primeirosLugares[2].pvap + "%",
                                "Total de votos": primeirosLugares[2].vap
                            }
                        ]

                    }
                    console.log(result)
                    console.log("=========================================")
                })
            } catch (error) {
            }
        }))
    }
}

Resultado.getResults()


