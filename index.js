const express = require("express");
const dotenv = require("dotenv");

// fs import
const userRoutes = require("./src/routes/userRoutes");

// env config
dotenv.config();

const { PORT } = process.env;

(async () => {

    // init app
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // route forwarding
    app.use('/user', userRoutes)

    // api root
    app.get("/", (req, res) => res.status(200).json({ message: "Backend active"}));
    // not found
    app.all("*", (req, res) => res.status(404).json({ message: "Route not found!" }))


    app.listen(PORT || 8080, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})();

