import fetch from 'node-fetch';


class Resultado {

    
    static ufs = ["ac", "al", "ap", "am", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rr", "sc", "sp", "se", "to"]

    static getResults() {
        this.ufs.forEach(uf => {

            fetch(`https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/${uf}/${uf}-c0001-e000544-r.json`).then(res => {
                res.json().then(json => {
                    try {
                        const primeiroLugar = json.cand.reduce(function (prev, current) {
                            return (prev.seq < current.seq) ? prev : current
                        })
                        console.log(uf.toUpperCase())
                        console.log(primeiroLugar.nm)
                        console.log(primeiroLugar.pvap + "%")
                        console.log(primeiroLugar.vap)
                        console.log("=========================================")
                    } catch (error) {

                    }
                })
            })


        })

    }

}

Resultado.getResults()


