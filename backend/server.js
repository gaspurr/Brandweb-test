const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const parser = require("body-parser")
const gameRoutes = require("./routes/games")

const PORT = process.env.PORT || 8080

const app = express()
const corsOpts = {
    origin: "*",

    methods: [
        'GET',
    ],

    allowedHeaders: [
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ],
};

app.use(cors(corsOpts));
app.use(express.json())

app.use(parser.json({ limit: "2mb", extended: true }))
app.use(parser.urlencoded({ limit: "2mb", extended: true }))
app.use(ignoreFavicon)

//this ignores the favicon fetch which makes this some routes to render twice
function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
        return res.status(204).end()
    }
    next();
}

app.use("/games", gameRoutes)

app.use('*', (req, res) => {
    res.send("This route does not exist")
})

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Succesfully connected to MongoDB")
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })