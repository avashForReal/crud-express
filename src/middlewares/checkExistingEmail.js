const readFile = require("../helpers/readFile")


const checkExistingEmail = async (req,res,next) => {
    try{
        
        const data = await readFile();
   
        // console.log(req.body);
        const user = data.find(user => user.email === req.body.email)

        
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
