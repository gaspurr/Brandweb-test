const {Game} = require("../models/gamesModel")

exports.getAllGames = async(req, res) =>{

    const checkGames = await Game.find()

    if(checkGames){
        res.status(200).send({checkGames})
    }else{
        res.status(400).send({message: "Something went wrong or there are now games to display"})
    }

}

exports.getOneGame = async(req,res) => {

    const {name} = req.params

    const oneGame = await Game.findOne({
        name: name
    })

    if(oneGame){
        res.status(200).send(oneGame)
    }else{
        res.status(201).send({message: "There is not such game to display"})
    }
}

exports.deleteOneGame = async(req,res) => {

    const {name} = req.params

    const oneGame = await Game.deleteOne({
        name: name
    })

    if(oneGame){
        res.status(200).send({message: "Deleted this game: "} + oneGame)
    }else{
        res.status(201).send({message: "There is no such game!"})
    }
}

//to reduce the query load time when handling large databases
exports.getAllGamesNames = async(req,res) => {


    const games = await Game.find({}, {name: 1})

    if(games){
        res.status(200).send(games)
    }else{
        res.status(201).send({message: "There are no games to display"})
    }
}

exports.addGame = async(req,res) => {

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

    if(!checkGame){
        const save = await Game.create(newGame)
        if(save){
            return res.status(200).json({message: "New game added"}).send(save)
        }else{
            return res.status(400).send({message: "Something went wrong while saving a new game"})
        }
    }else{
        return res.status(201).send({message: "This game already exists"})
    }
}

//TO-DO
/*
-pagination
-add farm
*/