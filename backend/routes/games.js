const router = require("express").Router()
const { check, validationResult} = require("express-validator")

const gameController = require("../controllers/gameController")

/*router.post("/login", [
    check("email", "Email must be correctly formated")
    .exists()
    .isEmail()
    .normalizeEmail(),
    check("password", "Password must be minimum 8 characters long")
    .exists()
    .isLength({
        min: 8
    })
], userController.login)*/
router.get("/query", gameController.paginatedResults)
router.get(":name", gameController.getOneGame)
router.get("/names", gameController.getAllGamesNames)
router.post("/add", gameController.addGame)
router.post("/update", gameController.updateGameDb)
router.get("/", gameController.getAllGames)


module.exports = router