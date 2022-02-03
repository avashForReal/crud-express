const fs = require("fs").promises
const path = require("path")

const readFile = async () => {
    try{
        const jsonPath = path.join(__dirname,"..","..","users.json")
        const data = await fs.readFile(jsonPath);
        return JSON.parse(data)
    }catch(e){
        console.log(e)
        throw new Error("An error occured")
    }
}

module.exports = readFile