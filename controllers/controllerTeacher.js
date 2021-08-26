const { Teacher, Student, Lecture, Grade } = require('../models')
const { checkPassword } = require('../helpers/bycript');
const DiscordBot = require("../helpers/discordBot")

class ControllerTeacher {
  static getLogin(req, res) {
    res.render("login_teacher")
  }
  static postLogin(req, res) {
    let { username, password } = req.body
    Teacher.findOne({
      where: { username: username }
    })
      .then(data => {
        if (data) {
          let comparePassword = checkPassword(password, data.password)
          if (comparePassword) {
            req.session.userId = data.id
            req.session.name = data.name
            req.session.username = data.username
            req.session.isLogin = true
            if (data.isAdmin) {
              req.session.userType = "admins"
              DiscordBot.sendMessage(`${req.session.name} has logged in as ${req.session.userType}`)
              res.redirect("/admins")
            } else {
              req.session.userType = "teachers"
              DiscordBot.sendMessage(`${req.session.name} has logged in as ${req.session.userType}`)
              res.redirect('/teachers')
            }
          } else {
            res.send("Email or Password incorrect")
          }
        } else {
          res.send("Username not registered")
        }
      })
      .catch(err => res.send('Salah'))
  }
  static getTeacherPage(req, res) {
    Teacher.findByPk(req.session.userId)
      .then(data => {
        res.render('./teacher/index', { data });
      })
      .catch(err => {
        res.send(err);
      })
  }
  static getListLecture(req, res) {
    Lecture.findAll({
      where: {
        TeacherId: req.session.userId
      }
    })
      .then(data => {
        res.render('./teacher/listLecture', { data });
      })
  }
  static getStudentList(req, res) {
    let result = [];
    Lecture.findAll({
      where: {
        id: req.params.id
      }, include: [Student]
    })
      .then(data => {
        result = data;
        return Grade.findAll({ where: { LectureId: req.params.id } });
      })
      .then(data => {
        res.render('./teacher/listStudent', { result, data })
      })
      .catch(err => {
        throw err;
      });
  }
  static getStudentGrade(req, res) {
    const studentName = req.params.sName;
    Grade.findAll({
      where: {
        StudentId: req.params.sId,
        LectureId: req.params.lId
      }
    })
      .then(data => {
        res.render('./teacher/editStudentGrade', { data, studentName })
      })
      .catch(err => {
        throw err;
      });
  }
  static postStudentGrade(req, res) {
    Grade.update({
      nilai: req.body.nilai,
      komentar: req.body.komentar
    }, {
      where: {
        StudentId: req.params.sId,
        LectureId: req.params.lId
      }
    })
      .then(() => {
        return Student.findByPk(req.params.sId)
      })
      .then((data) => {
        DiscordBot.scoreNotify(data.discordId, data.name)
        res.redirect(`/teachers/check-students/${req.params.lId}`)
      })
      .catch(err => {res.send(err.message)});
  }
}
module.exports = ControllerTeacher