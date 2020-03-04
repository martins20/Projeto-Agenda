const Contato = require('../models/ContatoModel')

exports.Index = (req, res) => {
  res.render('contato', {
    contato: {}
  })
}
exports.Create = async (req, res) => {

  try {
    const contato = new Contato(req.body)    
    await contato.register()
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => res.redirect('back'))
      return
    }
  
    req.flash('success', "Contato registrado com sucesso !")
    req.session.save(() => res.redirect(`/`))
      return

  } catch (e) {
    console.log(e)
    return res.render('404')
  }
}

exports.EditIndex = async (req, res) => {

  if(!req.params.id) return res.render('404')

  const contato = await Contato.searchId(req.params.id)

  if(!contato) return res.render('404')

  res.render('contato', { contato })
}

exports.Edit = async (req, res) => {

  try {

    if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)
  
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors)
      req.session.save(() => res.redirect('back'))
      return
    }
  
    req.flash('success', "Contato Editado com sucesso !")
    req.session.save(() => res.redirect(`/`))
      return
      
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.Delete = async (req, res) => {

  if(!req.params.id) return res.render('404')

  const contato = await Contato.delete(req.params.id)

  if(!contato) {
    return res.render('404')
  }

  req.flash('success', "Contato Excluido com sucesso !")
  req.session.save(() => res.redirect('back'))
    return
}