const moment = require ('moment')
var id = 0

class Aparelhos {
    constructor(nome, modelo, marca, dimensoes, pesomax, funcao, acessorios, datamntc, tecmntc){

        // if (array){ //verificar com a Karlla
        //     if(idExistente){
        //         this.id = idExistente
        //         } else {
        //             this.id = id++
        //         }
        //     }

            this.nome = nome
            this.modelo = modelo
            this.marca = marca
            this.dimensoes = dimensoes
            this.pesomax = pesomax
            this.funcao = funcao
            this.acessorios = acessorios
            this.datamntc = moment().format("YYYY-MM-DD")//VERIFICAR COM A KARLLA!
            this.tecmntc = tecmntc
        
        }
 }

module.exports = Aparelhos
