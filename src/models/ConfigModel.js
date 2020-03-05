const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const ConfigSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})


class Config {
  constructor(body, user) {
    this.body = body,
    this.errors = [],
    this.user = user
  }

  changePassword() {
    if(!bcrypt.compareSync(this.body.password, this.user.password)) {
        this.errors.push('Senha inválida')
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

module.exports = Config
