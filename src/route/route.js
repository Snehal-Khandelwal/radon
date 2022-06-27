const express = require('express');
const router = express.Router();
const BlogModel = require('../Controllers/BlogControllers.js')
const AuthorModel = require('../Controllers/AuthorControllers.js')
const MW = require('../Middlewares/middlewares.js')


router.post('/authors', AuthorModel.createAuthor )

router.post('/login', AuthorModel.authorLogin )

router.post('/blogs', MW.isTokenValid ,BlogModel.createBlog )

router.get('/blogs', MW.isTokenValid,BlogModel.getBlogs )

router.put('/blogs/:blogId',  MW.isTokenValid,MW.isAuthorised,BlogModel.updateBlog )

router.delete('/blogs/:blogId', MW.isTokenValid , MW.isAuthorised, BlogModel.deleteByParams )

router.delete('/blogs',MW.isTokenValid, BlogModel.deleteByQuery )//only applied authentication since we are dealing authorization inside the API only













module.exports = router;