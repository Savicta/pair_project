const express = require("express")
const ControllerTeacher = require("../controllers/controllerTeacher")
const teachersRouter = express.Router()
const { checkIsLogin } = require('../middleware/checkIsLogin');
const { checkIsNotLogin } = require('../middleware/checkIsNotLogin')

teachersRouter.get("/login", checkIsNotLogin, ControllerTeacher.getLogin);
teachersRouter.post("/login", checkIsNotLogin, ControllerTeacher.postLogin);

teachersRouter.use(checkIsLogin)

teachersRouter.get('/', ControllerTeacher.getTeacherPage);
teachersRouter.get('/list-lecture', ControllerTeacher.getListLecture);
teachersRouter.get('/check-students/:id', ControllerTeacher.getStudentList);
teachersRouter.get('/student-grade/:sName/:sId/:lId/edit', ControllerTeacher.getStudentGrade);
teachersRouter.post('/student-grade/:sName/:sId/:lId/edit', ControllerTeacher.postStudentGrade);


module.exports = teachersRouter