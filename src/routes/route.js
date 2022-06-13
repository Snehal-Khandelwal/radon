const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.post("/createUser", commonMW.mid1 , UserController.createUser)
router.post("/createProduct", UserController.createProduct)
router.post("/createOrder",commonMW.mid1,commonMW.idCheck, UserController.createOrder)

module.exports = router;