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

    // aqui eu faço a seleção por manutencao
    pegaAparelhoManutencao(){
        const SELECT_BY_MANUTENCAO = `
        SELECT ID, NOME, (Cast ((
            JulianDay('now') - JulianDay(DATAMNTC)
        ) As Integer) /(365/12)) AS CONSULTA_MNTC
        FROM APARELHOS
        WHERE CONSULTA_MNTC >= 6 `
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_MANUTENCAO, (error, rows)=>{
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
    // fim da selecao manutencao
    
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

    pegaAparelhoPorFuncao(funcao){
        const SELECT_BY_FUNCAO = `
        SELECT ID, NOME, FUNCAO FROM APARELHOS`
        return new Promise((resolve, reject)=>{
            this.bd.all(SELECT_BY_FUNCAO, (error, rows)=>{
                if(error){
                    reject({
                        "mensagem" : error.message,
                        "erro" : true 
                    })
                } else {
                    let result = []

                    for (let i=0; i<rows.length;i++){
                        const data = rows[i].FUNCAO.split(",")

                        function filterFunction(query) {
                            return data.filter(function (el) {
                              return el.indexOf(query) > 1 || el.indexOf(query) > -1 ;
                            });
                          }
                        
                        if (filterFunction(funcao) != false) {
                                    
                            result.push(rows[i])

                        }

                    }
                    resolve({
                        "requisicao" : result,
                        "erro" : false 
                    })
                }
            })
        })
    }

    async deletaAparelho(id){
        try {
            const aparelhos = await this.pegaAparelhoPorId(id)
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