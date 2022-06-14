const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const md= require("../controllers/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",md.isTokenPresent, md.isTokenValid, userController.getUserData)

router.put("/users/:userId", md.isTokenPresent, md.isTokenValid,userController.updateUser)

router.delete("/deleteAccount/:userId",md.isTokenPresent, md.isTokenValid, userController.deleteUser)

module.exports = router;