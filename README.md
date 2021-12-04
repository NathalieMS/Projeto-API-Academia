# API ACADEMIA

## Desenvolvimento de API em Node.JS com bibliotecas da framework express. 

### Sobre a API:

A API foi construídas para fins didáticos, como fechamento do Módulo 4 da Resilia Educação, demonstraremos em 4 setores diferentes como aplicá-la de maneira escálavel e vendável. Para que esse projeto Back End fosse construído utilizamos os conceitos de organização MVC, bem como o banco de dados SQL. Buscando além dos conhecimentos adquiridos em aula, fortalecer nossa base através do curso de Node.Js da Alura.

## Ferramentas presentes no trabalho:

<!--ts-->
   * SQLite
   * Node.Js
   * Express
   * Heroku
   
   
## Rotas da API:

| Método | Rota | Funcionalidade |
| ------ | ----- | ----------- |
| **GET** | `/aparelhos` | Gets em todos|
| **GET** | `/aparelhos/{id}` | Gets nos aparelhos por {id} |
| **GET** | `/manutencao/aparelhos` | Gets nos aparelhos que estão sem manutenção há mais de 6 meses |
| **GET** | `/aparelhos/busca/{funcao}` | Gets nos aparelhos por função já pré-estabelecida |
| **POST** | `/aparelhos` | Entrada de novo aparelho |
| **PUT** | `/aparelhos/{id}` | Alterações por {id} |
| **DELETE** | `/aparelhos/{id}` | Deleção de aparelho por {id} |

## Dependências Gerais:
```js
 "dependencies": {
    "express": "^4.17.1",
    "moment": "^2.29.1",
    "sqlite3": "^5.0.2"
  }
```

## Dependências Dev:

```
"devDependencies": {
    "nodemon": "^2.0.15"
  }
  ```
  
  ## Home Page:
  
https://github.com/NathalieMS/Projeto-API-Academia

  ## Heroku:

https://api-academia-aparelhos.herokuapp.com/
  
  ## Instalação Necessária
  
  ```bash
npm install
```

  ## Inicialização do Terminal
  
   ```bash
npm start
```

## Group 09

- [Larissa Silva](https://github.com/LariCostaSilva)
- [Murilo Mininel](https://github.com/MuriloMininel) 
- [Nathalie Moreira](https://github.com/NathalieMS) 
- [Yasmin Reis](https://github.com/yasminreisk)

## Author

- [Nathalie Moreira](https://github.com/NathalieMS)
