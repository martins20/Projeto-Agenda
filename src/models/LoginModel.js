const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
  constructor(body) {
    this.body = body,
    this.errors = [],
    this.user = null
  }

  async register() {
    this.validation()

    if(this.errors.length > 0) return

    await this.userExists()

    const salt = bcrypt.genSaltSync()
    this.body.password = bcrypt.hashSync(this.body.password, salt)

    this.user = await LoginModel.create(this.body)

  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email })

    if(this.user) this.errors.push('Usuário já existe')
  }

  async login() {
    this.validation()
    if(this.errors.length > 0) return

    this.user = await LoginModel.findOne({ email: this.body.email })

    if(!this.user) {
      this.errors.push('Usuário ou senha Invalido')
      return
    }

    if(!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida')
      this.user = null
      return;
    }
  }

  validation() {
    this.cleanUp()

    if(!this.body.email && !this.body.password) return this.errors.push('Preencha os Campos.')

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')

    if(this.body.password.length < 3 || this.body.password.length >= 50) this.errors.push('Senha precisa estar entre 3 e 50 caracteres.')


  }

  cleanUp() {
    for(const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login
