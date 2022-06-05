const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel.js")
const UserController= require("../controllers/userController")



router.post("/createBookList", UserController.createBookList  )

router.get("/getUsersData", UserController.getBookList)

module.exports = router;