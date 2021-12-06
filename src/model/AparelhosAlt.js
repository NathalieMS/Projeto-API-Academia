const moment = require ('moment')
var id = 0

class AparelhosAlt {
    constructor(nome, modelo, marca, dimensoes, pesomax, funcao, acessorios, datamntc, tecmntc){

            this.nome = nome
            this.modelo = modelo
            this.marca = marca
            this.dimensoes = dimensoes
            this.pesomax = pesomax
            this.funcao = AparelhosAlt._validaFuncao(funcao)
            this.acessorios = acessorios
            this.datamntc = moment(datamntc).format("YYYY-MM-DD")
            this.tecmntc = tecmntc
        
        }
 

        static _validaFuncao(funcao){
        const data = funcao.split(",")
        const funcoesValidas = ["superior", "inferior", "aeróbico"]
        let result = ''
        for (let i=0; i<(data.length -1); i++){
            if(funcoesValidas.indexOf(data[i]) > -1){
                result+= `${data[i]},`
            } else {
                throw new Error("A função dever ser igual a: superior, inferior, aeróbico")
            }
        }
        return result
    }

    
}
module.exports = AparelhosAlt
