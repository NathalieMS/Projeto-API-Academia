/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
// Arquivo responsável por criar a tabela e popular nosso bd
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const caminhoArq = path.resolve(__dirname,'database.db')
// Importante que o caminho abaixo seja o mesmo que o indicado no arquivo
// que exporta o bd (sqlite-db.js)
const db = new sqlite3.Database(caminhoArq);


//==== Tarefas
const APARELHOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS APARELHOS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    NOME VARCHAR(64),
    MODELO VARCHAR(64),
    MARCA VARCHAR(32),
    DIMENSOES VARCHAR(32),
    PESOMAX INTEGER,
    FUNCAO VARCHAR(32),
    ACESSORIOS VARCHAR(64),
    DATAMNTC VARCHAR(32),
    TECMNTC VARCHAR(64)
);`;


function criaTabelaAparelhos() {
    db.run(APARELHOS_SCHEMA, (error)=> {
        if(error) console.log("Erro ao criar tabela Aparelhos");
    });
}


db.serialize( ()=> {
    criaTabelaAparelhos();
});