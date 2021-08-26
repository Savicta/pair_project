function checkIsNotLogin(req, res, next) {
    if (req.session.isLogin) {
        res.redirect(`/${req.session.userType}`)
    } else {
        next()
    }
}


module.exports = {
    checkIsNotLogin
}