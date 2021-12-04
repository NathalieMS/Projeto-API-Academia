const AparelhosDAO = require('../DAO/AparelhosDAO')
const Aparelhos = require('../model/Aparelhos')
const AparelhosAlt = require('../model/AparelhosAlt')

const aparelhos = (app, bd) =>{
    const novoAparelhoDAO = new AparelhosDAO(bd)


    app.get('/aparelhos', async (req, res)=> {
        try {
            const resposta = await novoAparelhoDAO.pegaTodosAparelhos()
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }
    })

    app.get('/aparelhos/:id', async (req, res)=> { 
        const id = req.params.id
        try {
            const resposta = await novoAparelhoDAO.pegaAparelhoPorId(id)
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }
    })

    app.get('/manutencao/aparelhos', async (req, res)=> {
        try {
            const resposta = await novoAparelhoDAO.pegaAparelhoManutencao()
            res.json(resposta)
        } catch (error) {
            res.json(error)
        }
    })

    app.get('/aparelhos/busca/:funcao', async (req, res)=> {
        const funcao = req.params.funcao
        const funcaoSemEspaco = funcao.split(", ")
        //  Logica de busca do tarefa no bd
        try {
            const resposta = await novoAparelhoDAO.pegaAparelhoPorFuncao(funcaoSemEspaco)
            res.json(resposta)
        } catch (error) {
            res.status(404).json(error)
        }
    })


    app.post('/aparelhos', async (req, res)=> {
        // Usar o try-catch para pegar o erro, caso a validacao
        // do model de erro, ou outro erro apareça
        try {
            const body = req.body
            //Importante validar os campos com o model
            const novoAparelho = new Aparelhos(...Object.values(body))
    
            //Logica de inserção da entidade no bd
            const resposta = await novoAparelhoDAO.insereAparelho(novoAparelho)
            res.status(201).json(resposta)
        } catch (error) {
            // Resposta em caso de erro
            res.json({
                "mensagem" : error.message,
                "erro" : true 
            })
        }
    })

    app.delete('/aparelhos/:id', async (req, res)=> {
        const id = parseInt(req.params.id)
        try {
            const resposta = await novoAparelhoDAO.deletaAparelho(id)
            res.json(resposta)
        } catch (error) {
            res.status(404).json({
                "mensagem" : error.message,
                "erro" : true
            })
        }
    })

    app.put('/aparelhos/:id', async (req, res)=>{
        const id = req.params.id
        const body = req.body

        // Logica de atualizaçao da entidade no bd
        try {
            const respostaGet = await novoAparelhoDAO.pegaAparelhoPorId(id)
            const aparelhoAntigo = respostaGet.requisicao[0]
            
            if ( !body.funcao){
                const aparelhoAtualizado = new AparelhosAlt (
                    body.nome || aparelhoAntigo.NOME,
                    body.modelo || aparelhoAntigo.MODELO,
                    body.marca || aparelhoAntigo.MARCA,
                    body.dimensoes || aparelhoAntigo.DIMENSOES,
                    body.pesomax || aparelhoAntigo.PESOMAX,
                    aparelhoAntigo.FUNCAO,
                    body.acessorios || aparelhoAntigo.ACESSORIOS,
                    body.datamntc || aparelhoAntigo.DATAMNTC,
                    body.tecmntc || aparelhoAntigo.TECMNTC


                )
                const resposta = await novoAparelhoDAO.atualizaAparelho(id, aparelhoAtualizado)
                res.json(resposta)               
            }
            else if(aparelhoAntigo){
                const aparelhoAtualizado = new Aparelhos (
                    body.nome || aparelhoAntigo.NOME,
                    body.modelo || aparelhoAntigo.MODELO,
                    body.marca || aparelhoAntigo.MARCA,
                    body.dimensoes || aparelhoAntigo.DIMENSOES,
                    body.pesomax || aparelhoAntigo.PESOMAX,
                    body.funcao || aparelhoAntigo.FUNCAO,
                    body.acessorios || aparelhoAntigo.ACESSORIOS,
                    body.datamntc || aparelhoAntigo.DATAMNTC,
                    body.tecmntc || aparelhoAntigo.TECMNTC


                )
                const resposta = await novoAparelhoDAO.atualizaAparelho(id, aparelhoAtualizado)
                res.json(resposta)               
            }
            else {
                res.json({
                    "mensagem": `Aparelho com id "${id}" não existe`,
                    "error" : true
                })
            }
        } catch (error) {
            res.json({
                "mensagem" : error.message,
                "error" : true
            })
        }
    })

}

module.exports = aparelhos