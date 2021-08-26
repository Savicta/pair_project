const { Teacher, Student, Lecture, Grade } = require('../models/index');
const DiscordBot = require("../helpers/discordBot")


class ControllerAdmin {
  static getAdminPage(req, res) {
    Teacher.findByPk(req.session.userId)
      .then(data => {
        res.render('./admin/index', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getListTeacher(req, res) {
    Teacher.findAll({where: {isAdmin: false}})
      .then(data => {
        data.map(el => {
          el.name = Teacher.formatName(el.name)
        })
        res.render('./admin/listTeacher', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getAddTeacher(req, res) {
    res.render('./admin/addTeacher');
  }
  static postAddTeacher(req, res) {
    Teacher.create({
      name: req.body.name,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: false
    })
      .then(data => {
        res.redirect('/admins/list-teacher');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getEditTeacher(req, res) {
    Teacher.findByPk(req.params.id)
      .then(data => {
        res.render('./admin/editTeacher', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static postEditTeacher(req, res) {
    Teacher.update({
      name: req.body.name,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.redirect('/admins/list-teacher');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static deleteTeacher(req, res) {
    Teacher.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(res.redirect('/admins/list-teacher'))
      .catch(err => { res.send(err); });
  }
  // ========================================= //
  static getListStudent(req, res) {
    Student.findAll()
      .then(data => {
        data.map(el => {
          el.name = Student.formatName(el.name)
        }) 
        res.render('./admin/listStudent', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getAddStudent(req, res) {
    res.render('./admin/addStudent');
  }
  static postAddStudent(req, res) {
    Student.create({
      name: req.body.name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      phone_number: req.body.phone_number,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(data => {
        res.redirect('/admins/list-student');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getEditStudent(req, res) {
    Student.findByPk(req.params.id)
      .then(data => {
        res.render('./admin/editStudent', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static postEditStudent(req, res) {
    Student.update({
      name: req.body.name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      phone_number: req.body.phone_number,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      discordId: req.body.discordId
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.redirect('/admins/list-student');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static deleteStudent(req, res) {
    Student.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(res.redirect('/admins/list-student'))
      .catch(err => { res.send(err); });
  }
  // ========================================= //
  static getListLecture(req, res) {
    Lecture.findAll({include: Teacher})
      .then(data => {
        data.map(el => {
          el.Teacher.name = Teacher.formatName(el.Teacher.name)
        })
        res.render('./admin/listLecture', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getAddLecture(req, res) {
    Teacher.findAll({where: {isAdmin: false}})
      .then(data => {
        res.render('./admin/addLecture', { data });
      })
      .catch(err => {
        res.send(err);
      });
  }
  static postAddLecture(req, res) {
    Lecture.create({
      subject: req.body.subject,
      time: req.body.time,
      TeacherId: req.body.teacher
    })
      .then(data => {
        res.redirect('/admins/list-lecture');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getEditLecture(req, res) {
    let id = req.params.id
    let result = {}
    Lecture.findAll({where: {id: id}, include: [Teacher]})
      .then(data => {
        result.data = data;
        return Teacher.findAll()
      })
      .then(teacher => {
        result.teacher = teacher;
        res.render('./admin/editLecture', result);
      })
      .catch(err => {
        res.send(err);
      });
  }
  static postEditLecture(req, res) {
    Lecture.update({
      subject: req.body.subject,
      time: req.body.time,
      TeacherId: req.body.teacher
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.redirect('/admins/list-lecture');
      })
      .catch(err => {
        res.send(err);
      });
  }
  static getStudentLecture(req, res) {
    let result = {};
    Student.findByPk(req.params.id, {include: Lecture})
      .then(data => {
        result.data = data;
        return Lecture.findAll();
      })
      .then(lecture => {
        result.lecture = lecture;
        res.render('./admin/studentLecture', result);
      })
      .catch(err => {
        res.send(err);
      });
  }
  static postStudentLecture(req, res) {
    Grade.create({
      LectureId: req.body.LectureId,
      StudentId: req.params.id,
      nilai: 0
    })
      .then(res.redirect(`/admins/list-student/${req.params.id}/edit-lecture`))
      .catch(err => {
        res.send(err);
      })
  }
  static deleteLecture(req, res) {
    Lecture.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(res.redirect('/admins/list-lecture'))
      .catch(err => { res.send(err); });
  }
}

module.exports = ControllerAdmin