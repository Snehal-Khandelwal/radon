const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const md= require("../controllers/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/myState", userController.myState  )
router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",md.isTokenPresent, md.isTokenValid,md.isAuthorised ,userController.getUserData)

router.put("/users/:userId", md.isTokenPresent, md.isTokenValid,md.isAuthorised,userController.updateUser)

router.delete("/deleteAccount/:userId",md.isTokenPresent, md.isTokenValid,md.isAuthorised, userController.deleteUser)

module.exports = router;