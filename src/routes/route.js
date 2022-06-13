const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")


router.post("/createUser", commonMW.Mid1 , UserController.createUser)
router.post("/createProduct",Controller.createBook)




module.exports = router;