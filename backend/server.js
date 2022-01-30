const express = require("express")
const axios = require('axios')
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const parser = require("body-parser")
const { Game } = require("./models/gamesModel")
const gameRoutes = require("./routes/games")

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
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

app.use("/", gameRoutes)

//fetch from external api
app.use('/updateGames', async function (req, res, next) {
    const array = []

    await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
        .then(response => {
            const sliced = response.data["results"].slice(0, 5)
            sliced.map(obj => {
                const foo = {
                    id: obj.id,
                    name: obj.name,
                    rating: obj.rating,
                    metacritic: obj.metacritic,
                    ratings: obj.ratings,
                    background_image: obj.background_image,
                    genres: obj.genres,
                    released: obj.released,
                    updated: obj.updated,
                }
                array.push(foo)

            })
        }).catch(e => {
            res.send(e)
        })

    const newGameObj = array.map(async game => {

        let newGame = new Game(game);

        return newGame;
    });


    if (newGameObj) {
        Promise.all(newGameObj)
            .then(async res => {
                await Game.create(res);
            }).catch(e => {
                console.log(e)
            })
    }


    res.send(array)
})

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