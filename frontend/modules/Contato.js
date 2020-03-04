import validator from 'validator'

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if(!this.form) return

        this.form.addEventListener('submit', e =>  {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const nameInput = el.querySelector('input[name="name"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        let error = false
        
        if(!nameInput.value) {
            alert('Nome é um campo Obrigatório.')
            error = true
        }

        if(!emailInput.value && !telefoneInput.value) {
            alert('Pelomenos 1 contato precisa ser enviado: E-mail ou Telefone.')
            error = true
            return
        }

        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail inválido.')
            error = true
        } 

        if(!error) el.submit()
    }
}