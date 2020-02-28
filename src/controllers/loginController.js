const Login = require('../models/LoginModel')

exports.Index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    return res.render('login')
}

exports.Create = async (req, res) => {
    try {
        const login = new Login(req.body)

        await login.register()

        if(login.errors.length > 0 ) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Seu usuário foi criado com sucesso !')
        req.session.save(() => {
            return res.redirect('back')
        })
    } catch (e) {
        console.log(e)
        return res.redirect('404')
    }
}

exports.Login = async (req, res) => {
    try {
        const login = new Login(req.body)

        await login.login()

        if(login.errors.length > 0 ) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', 'Logado com sucesso !')
        req.session.user = login.user
        req.session.save(() => {
            return res.redirect('back')
        })
    } catch (e) {
        console.log(e)
        return res.redirect('404')
    }
}

exports.LogOut = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

