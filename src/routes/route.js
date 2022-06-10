const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")



router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher", authorController.createPublisher  )
router.post("/createBook", bookController.createBook  )
router.put("/updateBookData", bookController.updateBookData)
router.put("/updateBookData1", bookController.updateBookData1)
router.get("/getBooksWithCompleteDetails", bookController.getBooksWithCompleteDetails)

module.exports = router;