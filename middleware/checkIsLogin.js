function checkIsLogin(req, res, next) {
    if (req.session.isLogin) {
        if (req.baseUrl.slice(1) === req.session.userType) {
            next()
        } else {
            res.redirect(`/${req.session.userType}`)
        }
    } else {
        res.redirect("/")
    }
}


module.exports = {
    checkIsLogin
}