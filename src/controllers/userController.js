const readFile = require("../helpers/readFile")
const writeFile = require("../helpers/writeFile")
const hashPassword = require("../helpers/hashPassword")

// uuidv4
const { v4 } = require('uuid');

// get all
const getUsers = async (_, res) => {

    try {
        // read file
        const data = await readFile();

        // remove password before sending the data
        const cleanData = data.map(({ password, ...rest }) => rest)

        res.status(200).json({ message: "success", data: cleanData })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }

}

// create user
const createUser = async (req, res) => {
    try {
        // get password from req body
        const { password } = req.body

        // hash the pw
        const hashedPassword = await hashPassword(password)

        // generate id
        const id = v4()

        // append id and hashed pw to the data
        const data = {
            ...req.body,
            password: hashedPassword,
            id
        }

        // get all data file
        const userData = await readFile();

        // append data to the file
        userData.push(data)

        // write the file
        await writeFile(userData)

        res.status(200).json({ message: "successfully created a new user" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get user detail based on user id
const getUser = async (req, res) => {
    try {
        // read the json data
        const data = await readFile();

        // get user for the given id
        const user = data.find(user => {
            return user.id == req.params.id
        })

        // check if the user exists
        if (user) {
            // delete password before sending the data
            delete user.password
            res.status(200).json({ message: "success", data: user })
        } else {
            res.status(409).json({ message: "user not found" })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }

}


// delete an existing user
const deleteUser = async (req, res) => {
    try {
        // get data
        const data = await readFile();
        // find user from param id
        const user = data.find(user => {
            return user.id == req.params.id
        })

        // check if user exists
        if (user) {
            // data without the user with given id
            const userData = data.filter(user => {
                return user.id !== req.params.id
            })

            // write the new data
            await writeFile(userData)

            res.status(200).json({ message: "deleted the user" })

        } else {
            res.status(409).json({ message: "user not found" })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        // get data
        const data = await readFile();

        // find user from param id
        const user = data.find(user => {
            return user.id == req.params.id
        })

        // check if user exists
        if (user) {
            // find the data index
            const dataIndex = data.findIndex(userData => userData.id == req.params.id);

            const requestObject = req.body

            if ("password" in requestObject) {
                const encryptedPassword = await hashPassword(requestObject.password)
                data[dataIndex].password = encryptedPassword
            }

            if("email" in requestObject ){
                data[dataIndex].email = requestObject.email
            }

            if("address" in requestObject){
                data[dataIndex].address = requestObject.address
            }

            if("name" in requestObject){
                data[dataIndex].name = requestObject.name
            }

            // write the new data
            await writeFile(data)

            res.status(200).json({ message: "user updated" })

        } else {
            res.status(409).json({ message: "user not found" })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
}