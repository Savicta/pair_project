const express = require("express")
const ControllerAdmin = require("../controllers/controllerAdmin")
const adminsRouter = express.Router()
const { checkIsLogin } = require('../middleware/checkIsLogin')


adminsRouter.use(checkIsLogin)

adminsRouter.get("/", ControllerAdmin.getAdminPage);

// Teacher
adminsRouter.get("/add-teacher", ControllerAdmin.getAddTeacher);
adminsRouter.post("/add-teacher", ControllerAdmin.postAddTeacher);
adminsRouter.get("/list-teacher", ControllerAdmin.getListTeacher);
adminsRouter.get("/list-teacher/:id/edit", ControllerAdmin.getEditTeacher);
adminsRouter.post("/list-teacher/:id/edit", ControllerAdmin.postEditTeacher);
adminsRouter.get("/list-teacher/:id/delete", ControllerAdmin.deleteTeacher);

// Student
adminsRouter.get("/add-student", ControllerAdmin.getAddStudent);
adminsRouter.post("/add-student", ControllerAdmin.postAddStudent);
adminsRouter.get("/list-student", ControllerAdmin.getListStudent);
adminsRouter.get("/list-student/:id/edit", ControllerAdmin.getEditStudent);
adminsRouter.post("/list-student/:id/edit", ControllerAdmin.postEditStudent);
adminsRouter.get("/list-student/:id/edit-lecture", ControllerAdmin.getStudentLecture);
adminsRouter.post("/list-student/:id/edit-lecture", ControllerAdmin.postStudentLecture);
adminsRouter.get("/list-student/:id/delete", ControllerAdmin.deleteStudent);

// Lecture
adminsRouter.get("/add-lecture", ControllerAdmin.getAddLecture);
adminsRouter.post("/add-lecture", ControllerAdmin.postAddLecture);
adminsRouter.get("/list-lecture", ControllerAdmin.getListLecture);
adminsRouter.get("/list-lecture/:id/edit", ControllerAdmin.getEditLecture);
adminsRouter.post("/list-lecture/:id/edit", ControllerAdmin.postEditLecture);
adminsRouter.get("/list-lecture/:id/delete", ControllerAdmin.deleteLecture);

module.exports = adminsRouter