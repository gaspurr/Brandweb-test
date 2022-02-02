const { Game } = require("../models/gamesModel")
const axios = require("axios")


//Update database from external api
exports.updateGameDb = async (req, res) => {
    const array = []


    //I should change this to update that checks documents and updates if necessary
    //right now if you want to change the slice parameter and update the DB then you need to first drop it
    await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
        .then(response => {
            const sliced = response.data["results"].slice(0, 200)
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


    return res.send(array)
}

exports.getAllGames = async (req, res) => {

    const checkGames = await Game.find()

    if (checkGames) {
        return res.status(200).send(checkGames)
    } else {
        return res.status(400).send({ message: "Something went wrong or there are now games to display" })
    }

}

exports.getOneGame = async (req, res) => {

    const { name } = req.params

    const oneGame = await Game.findOne({
        name: name
    })

    if (oneGame) {
        res.status(200).send(oneGame)
    } else {
        res.status(201).send({ message: "There is no such game to display" })
    }
}

exports.paginatedResults = async(req,res) =>{

    const {
        page,
        limit
    } = req.query

    const limitation = parseInt(limit)
    const skip = (page -1) * limitation

    const queriedGames = await Game.find().limit(limitation).skip(skip)

    if(queriedGames){
        return res.status(200).send(queriedGames)
    }else{
        return res.status(400).send({message: "No non no"})
    }
}

exports.deleteOneGame = async (req, res) => {

    const { name } = req.params

    const oneGame = await Game.deleteOne({
        name: name
    })

    if (oneGame) {
        res.status(200).send({ message: "Deleted this game: " } + oneGame)
    } else {
        res.status(201).send({ message: "There is no such game!" })
    }
}

//to reduce the query load time when handling large databases
exports.getAllGamesNames = async (req, res) => {


    const games = await Game.find({}, { name: 1, id: 1 })

    if (games) {
        res.status(200).send(games)
    } else {
        res.status(201).send({ message: "There are no games to display" })
    }
}

exports.addGame = async (req, res) => {

    const {
        id,
        name,
        rating,
        metacritic,
        ratings,
        background_image,
        genres,
        released,
        updated
    } = req.body


    const newGame = new Game({
        id: id,
        name: name,
        rating: rating,
        metacritic: metacritic,
        ratings: ratings,
        background_image: background_image,
        genres: genres,
        released: released,
        updated: updated,
    })

    //check if this game already exists
    const checkGame = await Game.findOne({
        name: name
    })

    if (!checkGame) {
        const save = await Game.create(newGame)
        if (save) {
            return res.status(200).json({ message: "New game added" }).send(save)
        } else {
            return res.status(400).send({ message: "Something went wrong while saving a new game" })
        }
    } else {
        return res.status(201).send({ message: "This game already exists" })
    }
}

//TO-DO
/*
-
*/