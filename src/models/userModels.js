const readFile = require("../helpers/readFile")
const writeFile = require("../helpers/writeFile")

//get all 
const getAll = async () => {
    try {
        // read file
        const data = await readFile();

        // remove password before sending the data
        const cleanData = data.map(({ password, ...rest }) => rest)

        return cleanData

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// insert one data
const insertOne = async (data) => {
    try {
        //   get all data file
        const userData = await readFile();

        // append data to the file
        userData.push(data)

        // write the file
        await writeFile(userData)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// find one by id
const findOneById = async (id) => {
    try {
        // read the json data
        const data = await readFile();

        // get user for the given id
        const singleUser = data.find(user => {
            return user.id === id
        })

        return singleUser
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// delete one using id
const deleteOneById = async (id) => {
    try {
        // read the json data
        const data = await readFile();

        // get user for the given id
        const singleUser = data.find(user => {
            return user.id === id
        })

        // if no user found
        if (!singleUser) {
            return {
                status: false,
                message: "user not found"
            }
        }

        // delete user for the given id
        const newUserData = data.filter(user => {
            return user.id !== id
        })

        // write the new data
        await writeFile(newUserData)

        return {
            status: true,
            message: "user deleted successfully"
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

// first parameter is the id and second is the data to be updated
const updateOneById = async (id, requestObject) => {
    try {
        // read the json data
        const data = await readFile();

        // get user for the given id
        const singleUser = data.find(user => {
            return user.id === id
        })

        // if no user found
        if (!singleUser) {
            return {
                status: false,
                message: "user not found"
            }
        }

        // find the data index
        const dataIndex = data.findIndex(userData => userData.id == id);

        // loop through the object
        for (keys in requestObject) {
            // check if the data exists
            if (requestObject[keys]) {
                // update the data
                data[dataIndex][keys] = requestObject[keys]
            }
        }

        delete data[dataIndex].password

        return {
            status: true,
            data: data[dataIndex]
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}


module.exports = {
    getAll,
    insertOne,
    findOneById,
    deleteOneById,
    updateOneById
}