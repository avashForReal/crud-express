const bcrypt = require("bcrypt")

const hashPassword = async (plainPassword) => {
    
    return await bcrypt.hash(plainPassword, 10)
    
}

module.exports =  hashPassword 