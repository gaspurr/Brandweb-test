const mongoose = require("mongoose")

const gameSchema = mongoose.model("Game", new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    rating: { type: Number },
    metacritic: { type: Number },
    ratings: { type: Array, default: [] },
    background_image: { type: String },
    genres: { type: Array, default: [] },
    released: { type: Date, required: true },
    updated: { type: Date, required: true },
}))

exports.Game = gameSchema