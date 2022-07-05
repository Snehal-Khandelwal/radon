const express = require('express');
const router = express.Router();
const BlogModel = require('../controllers/blogControllers.js')
const AuthorModel = require('../controllers/authorControllers.js')
const MW = require('../middlewares/middlewares.js')


router.post('/authors', AuthorModel.createAuthor )

router.post('/login', AuthorModel.authorLogin )

router.post('/blogs', MW.isTokenValid ,BlogModel.createBlog )

router.get('/blogs', MW.isTokenValid,BlogModel.getBlogs )

router.put('/blogs/:blogId',  MW.isTokenValid,MW.isAuthorised,BlogModel.updateBlog )

router.delete('/blogs/:blogId', MW.isTokenValid , MW.isAuthorised, BlogModel.deleteByParams )

router.delete('/blogs',MW.isTokenValid, BlogModel.deleteByQuery )//only applied authentication since we are dealing authorization inside the API only













module.exports = router;