const express = require("express")
const app = express()
const port = 3000
const router = require("./routes/index.js")
const session = require("express-session")

app.set("view engine", "ejs")


app.use("/", express.static(__dirname + "public"))

app.use("/", express.urlencoded({ extended: true }))

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
}))

app.use("/", router)


app.listen(port, () => {
    console.log("server on port " + port)
})

/*
// === Jangan lupa install
npm i bcrypt express ejs pg sequelize express-session discord.js

// === Sequelize Commands
sequelize db:create

sequelize model:generate --name Student --attributes name:string,gender:string,birth_date:dateonly,phone_number:string,email:string,username:string,password:string

sequelize model:generate --name Teacher --attributes name:string,gender:string,phone_number:string,email:string,username:string,password:string,isAdmin:boolean

sequelize model:generate --name Grade --attributes nilai:integer,komentar:string

sequelize model:generate --name Lecture --attributes subject:string,time:date

sequelize migration:generate --name addFkStudentIdToGrades
sequelize migration:generate --name addFkLectureIdToGrades
sequelize migration:generate --name addFkTeacherIdToLecture

sequelize migration:generate --name addUniqueConsToStudentUsername
sequelize migration:generate --name addUniqueConsToTeacherUsername

sequelize migration:generate --name addColumnDiscordIdToStudents

queryInterface.addConstraint('Users', {
  fields: ['email'],
  type: 'unique',
  name: 'custom_unique_constraint_name'
});

sequelize seed:generate --name seeders-teachers
sequelize seed:generate --name seeders-students
sequelize seed:generate --name seeders-lectures
sequelize seed:generate --name seeders-grades

*/