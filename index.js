import fetch from 'node-fetch';


class Resultado {



    static async getResults() {


        const ufs = ["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"]
        const urls = ufs.map(uf => `https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/${uf}/${uf}-c0001-e000544-r.json`);
        const response = await Promise.all(urls.map(url => fetch(url)))
        await Promise.all(response.map(res => {
            try {
                res.json().then(data => {
                    const primeiroLugar = data.cand.reduce(function (prev, current) {
                        return (prev.seq < current.seq) ? prev : current
                    })

                    let result = {
                        UF: data.cdabr,
                        Apuração: data.pst + "%",
                        Candidato: primeiroLugar.nm,
                        "% dos votos": primeiroLugar.pvap + "%",
                        "Total de votos": primeiroLugar.vap
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


