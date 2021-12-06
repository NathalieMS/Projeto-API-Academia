const express = require('express')
const app = express()
const bd = require('./infra/sqlite-bd.js')

//importando controllers
const aparelhos = require('../src/controller/aparelhos-controller')


// Middlewares
app.use(express.json())
app.use((req, res, next)=>{
    next()
  })

  // Rotas das Entidades
aparelhos(app, bd)

module.exports = app