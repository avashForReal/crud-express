const hashPassword = require("../helpers/hashPassword")

const userModels = require("../models/userModels")

// uuidv4
const { v4 } = require('uuid');

// get all
const getUsers = async (_, res) => {

    try {
        // get all data
        const data = await userModels.getAll()

        res.status(200).json({ message: "success", data })
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

        // insert the data
        await userModels.insertOne(data)

        res.status(200).json({ message: "successfully created a new user" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// get user detail based on user id from params
const getUser = async (req, res) => {
    try {
        //destructure the id
        const { id } = req.params

        // find user by id
        const user = await userModels.findOneById(id);

        // check if the user doesn't exists
        if (!user) {
            res.status(409).json({ message: "user not found" })
        }

        // delete password before sending the data
        delete user.password
        // send response
        res.status(200).json({ message: "success", data: user })

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }

}


// delete an existing user
const deleteUser = async (req, res) => {
    try {
        // destructure id
        const { id } = req.params

        // get user by id
        const dbResponse = await userModels.deleteOneById(id)

        console.log(dbResponse.status);

        // check response: boolean 
        if (!dbResponse.status) {
            console.log("running");
            return res.status(409).json({ message: dbResponse.message })
        }

        console.log("running outside");
        res.status(200).json({ message: dbResponse.message })

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        // destructure id from params
        const { id } = req.params

        // destructure request body
        const { email, password, name, address } = req.body

        // extract only the keys with values
        const requestObject = {
            email,
            password,
            name,
            address
        }

        // hash the password if exists
        if (password) {
            requestObject.password = await hashPassword(requestObject.password)
        }

        // await result: updateOneById: (id<required>, data-to-update<required>)
        const user = await userModels.updateOneById(id, requestObject)

        // user doesnt exist: boolean
        if (!user.status) {
           return res.status(409).json({ message: user.message })
        }

        res.status(200).json({ message: "user updated", data: user.data })
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