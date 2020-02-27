const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.Index)

//Rotas de Login

route.get('/login', loginController.Index)

route.post('/login/register', loginController.Store)

route.post('/login/login', loginController.Login)

route.get('/login/logout', loginController.LogOut)

// Rotas de Contato
route.get('/contato', loginRequired, contatoController.Index)
route.post('/contato/register', loginRequired, contatoController.Store)

module.exports = route
