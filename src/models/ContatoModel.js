const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sobrenome: {type: String, default: ''},
  email: {type: String, default: ''},
  telefone: {type: String, default: ''},
  data: {type: Date, default: Date.now},
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body,
        this.errors = [],
        this.contato = null
    }

    async register() {
        this.validation()
        
        if(this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    
    validation() {
        this.cleanUp()
        
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
        if(!this.body.name) this.errors.push('Nome é um campo obrigatório.')
        if(!this.body.email && !this.body.telefone) {
            this.errors.push('Pelomenos 1 contado precisa ser enviado: E-mail ou Telefone.')
        }
    }
    
    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            name: this.body.name,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }
    
    async edit(id) {
        if(typeof id !== 'string') return
        this.validation()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true})
    }
    
    static async searchId(id) {
        if(typeof id !== 'string') return
    
        const user = await ContatoModel.findById(id)
    
        return user
    }
    static async delete(id) {
        if(typeof id !== 'string') return
    
        const user = await ContatoModel.findOneAndDelete({_id: id})
    
        return user
    }
    
    static async searchContatos() {
    
        const contatos = await ContatoModel.find()
            .sort({ data: -1 })
    
        return contatos
    }

}

module.exports = Contato
