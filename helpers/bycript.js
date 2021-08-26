const bcrypt = require('bcrypt');

let salt = bcrypt.genSaltSync(10)
function hashPassword(plainPassword) {
   return bcrypt.hashSync(plainPassword, salt)
} 

function checkPassword(plainPass, hashedPass) {
    return bcrypt.compareSync(plainPass, hashedPass) // boolean true/false
}

module.exports = { hashPassword, checkPassword }