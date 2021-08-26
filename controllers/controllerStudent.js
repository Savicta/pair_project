const {Student, Lecture, Teacher, Grade} = require("../models")
const { checkPassword } = require("../helpers/bycript")
const DiscordBot = require("../helpers/discordBot")

class ControllerStudent {
    static getLogin(req, res) {
        res.render("login_student")
    }

    static postLogin(req, res) {
        
        let {username, password} = req.body
        Student.findOne({
            where: { username : username}
        })
            .then(data => {
                if(data) {
                    let comparePassword = checkPassword(password, data.password)
                    if(comparePassword) {
                        req.session.userId = data.id
                        req.session.name = data.name
                        req.session.username = data.username
                        req.session.userType = "students"
                        req.session.isLogin = true
                        DiscordBot.sendMessage(`${req.session.name} has logged in as ${req.session.userType}`)
                        res.redirect("/students")
                    } else {
                        res.send("Email or Password incorrect")
                    }
                } else {
                    res.send("Username not registered")
                }
            })
            .catch(err => res.send(err))
    }

    static viewScore(req, res) {
        const idUser = req.session.userId
        let result = {}
        Student.findAll({
            where: {
                id: idUser
            },
            include: [Lecture]
        })
            .then((student) => {
                student[0].name = Student.formatName(student[0].name)
                result.student = student
                
                return Teacher.findAll()
                
            })
            .then((teacher)=> {
                result.teacher = teacher
                res.render("students", result)
            })
            .catch((err) => res.send(err))
        
        // 
    }
}
module.exports = ControllerStudent