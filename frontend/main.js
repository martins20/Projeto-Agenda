import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Login from './modules/Login'
import Contato from './modules/Contato';

const cadastro = new Login('.form-cadastro')
const login = new Login('.form-login')

const contato = new Contato('.form-contato')

login.init()
cadastro.init()
contato.init()
