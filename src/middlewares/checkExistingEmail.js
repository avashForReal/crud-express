const readFile = require("../helpers/readFile")

// checks if the email already exists in the db
const checkExistingEmail = async (req,res,next) => {
    try{
        
        const data = await readFile();
   
        // find user with the requested email
        const user = data.find(user => user.email === req.body.email)

        // if found send message, else proceed with the request
        if(user){
            res.status(409).json({ error: "Email already exists"})
        }else{
            next()
        }
    }catch(e){
        console.log(e);
        throw new Error("An error occured")
    }
}

module.exports = {checkExistingEmail}
