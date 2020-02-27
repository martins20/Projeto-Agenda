const Contato = require('../models/ContatoModel')

exports.Index = (req, res) => {
  res.render('contato')
}
exports.Store = async (req, res) => {

  try {
    const contato = new Contato(req.body)    
    await contato.register()
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => res.redirect('back'))
      return
    }
  
    req.flash('success', "Contato registrado com sucesso !")
    console.log('cheguei aqui')
    req.session.save(() => res.redirect('back'))
      return

  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}
