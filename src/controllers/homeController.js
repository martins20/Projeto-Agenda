const Contato = require('../models/ContatoModel')

exports.Index = async (req, res) => {

  const contatos = await Contato.searchContatos()

  res.render('index', { contatos })
}