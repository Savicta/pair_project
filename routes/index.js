const express = require("express")
const router = express.Router()
const studentsRouter = require("./studentsRouter")
const teachersRouter = require("./teachersRouter")
const adminsRouter = require("./adminsRouter")
const { checkIsNotLogin } = require('../middleware/checkIsNotLogin')



router.get("/", checkIsNotLogin, (req, res) => {
    res.render("home")
})



router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.use ("/students", studentsRouter)
router.use("/teachers", teachersRouter)
router.use("/admins", adminsRouter)

module.exports = router