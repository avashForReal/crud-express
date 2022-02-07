const fs = require("fs").promises
const path = require("path")

const readFile = async () => {
    try{
        const jsonPath = path.join(__dirname,"..","db","users.json")
        const data = await fs.readFile(jsonPath);
        
        return JSON.parse(data)
    }catch(e){
        console.log(e)
        throw new Error("An error occured")
    }
}

readFile()

module.exports = readFile