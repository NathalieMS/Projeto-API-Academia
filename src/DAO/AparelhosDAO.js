const res = require("express/lib/response")
const aparelhos = require("../controller/aparelhos-controller")

class AparelhosDAO{
    constructor(bd){
        this.bd = bd
    }

    pegaTodosAparelhos(){
        const SELECT_ALL = `
        SELECT * FROM APARELHOS
        `
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_ALL, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "error" : true
                    }) 
                } else{
                    resolve({
                        "aparelhos" : rows,
                        "count": rows.length,
                        "error" : false
                    })
                }
            })
        })  
    }

    insereAparelho(novoAparelho){
        const INSERT_APARELHO = `
        INSERT INTO APARELHOS
            ( NOME, MODELO, MARCA, DIMENSOES, PESOMAX, FUNCAO, ACESSORIOS, DATAMNTC, TECMNTC)
        VALUES
            (?,?,?,?,?,?,?,?,?)
        `
        return new Promise((resolve, reject)=>{
            this.bd.run(INSERT_APARELHO, [...Object.values(novoAparelho)], (error)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : novoAparelho,
                        "erro" : false 
                    })
                }
            })
        })
    }

    //aqui eu faço a seleção por manutencao
    // pegaAparelhoManutencao(datamntc){
    //     const SELECT_BY_MANUTENCAO = `
    //     SELECT * FROM APARELHOS
    //     WHERE STATUS = ?`
    //     return new Promise((resolve, reject)=>{
    //         this.bd.all(SELECT_BY_STATUS, datamntc, (error, rows)=>{
    //             if(error){
    //                 reject({
    //                     "mensagem" : error.message,
    //                     "erro" : true 
    //                 })
    //             } else {
    //                 resolve({
    //                     "requisicao" : rows,
    //                     "erro" : false 
    //                 })
    //             }
    //         })
    //     })
    // }
    //fim da selecao manutencao
    
    pegaAparelhoPorId(id){
        const SELECT_BY_ID = `
        SELECT * FROM APARELHOS
        WHERE ID = ?`
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_ID, id, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    resolve({
                        "requisicao" : rows,
                        "erro" : false 
                    })
                }
            })
        })
    }

    async deletaAparelho(id){
        try {
            const aparelhos = await this.pegaAparelhoPorId(id)
            console.log(aparelhos, aparelhos.requisicao.length)
            if(aparelhos.requisicao.length){
                const DELETE = `
                DELETE FROM APARELHOS
                WHERE ID = ?`

                return new Promise((resolve, reject)=>{
                    this.bd.run(DELETE, id, (error)=>{
                        if(error){
                            reject(error.message)
                        } else {
                            resolve({
                                "mensagem" : `Aparelho de id ${id} deletada`,
                                "erro" : false 
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Aparelho de id ${id} não existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }
        
    }

    async atualizaAparelho(id, novoAparelho){
        try {
            const UPDATE = `
            UPDATE APARELHOS
            SET NOME = ?, MODELO = ?, MARCA = ?, DIMENSOES = ?, PESOMAX = ?, FUNCAO = ?, ACESSORIOS = ?, DATAMNTC = ?, TECMNTC = ?
            WHERE ID = ?`
            return new Promise((resolve, reject)=>{
                this.bd.run(UPDATE,
                    [novoAparelho.nome, novoAparelho.modelo, novoAparelho.marca, novoAparelho.dimensoes, novoAparelho.pesomax, novoAparelho.funcao, novoAparelho.acessorios, novoAparelho.datamntc, novoAparelho.tecmntc, id], 
                    (error)=>{
                    if(error){
                        reject(error)
                    } else {
                        resolve({
                            "mensagem" : `Aparelho de id ${id} atualizada`,
                            "usuario": novoAparelho,
                            "erro" : false 
                        })
                    }
                })
            })
        } catch (error) {
            throw new Error(error.message)
        }   
    }

}

module.exports = AparelhosDAO