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

router.get("/", gameController.getAllGames)
router.get("/:name", gameController.getOneGame)
router.get("/games/names", gameController.getAllGamesNames)
router.post("/games/add", gameController.addGame)
module.exports = router