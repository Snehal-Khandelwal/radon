const express = require('express');
const router = express.Router();
const authorModel= require("../models/authorModel.js")
const newBookController= require("../controllers/newBookController")
// const authorController= require("../controllers/authorController")



router.post("/createNewBook", newBookController.createNewBook  )

router.get("/findBookByAuthor", newBookController.findBookByAuthor)

router.post("/createAuthor", newBookController.createAuthor  )

router.get("/anotherBook", newBookController.anotherBook  )

router.get("/theAuthorList", newBookController.theAuthorList  )

module.exports = router;