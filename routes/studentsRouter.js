const express = require("express")
const ControllerStudent = require("../controllers/controllerStudent")
const studentsRouter = express.Router()
const { checkIsLogin } = require("../middleware/checkIsLogin")
const { checkIsNotLogin } = require('../middleware/checkIsNotLogin')



studentsRouter.get("/login", checkIsNotLogin, ControllerStudent.getLogin)

studentsRouter.post("/login", checkIsNotLogin, ControllerStudent.postLogin)

studentsRouter.get("/", checkIsLogin, ControllerStudent.viewScore)



module.exports = studentsRouter
