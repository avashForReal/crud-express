const fs = require("fs").promises
const path = require("path")

const writeFile = async(userData) => {
    try{
        const jsonPath = path.join(__dirname,"..","db","users.json")
        await fs.writeFile(jsonPath, JSON.stringify(userData, null, 4));
    }catch(e){
        console.log(e)
        throw new Error("An error occured")
    }
}

module.exports = writeFile