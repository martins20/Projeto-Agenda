const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')

// Rotas da home
route.get('/', homeController.Index)

//Rotas de Login

route.get('/login', loginController.Index)
route.post('/login/register', loginController.Store)

module.exports = route
