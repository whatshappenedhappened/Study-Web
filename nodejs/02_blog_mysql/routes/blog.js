const express = require('express');
// const uuid = require('uuid');

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/posts');
});

router.get('/posts', async function (req, res) {

    res.render('posts-list');
});

router.get('/new-post', async function (req, res) {
    res.render('create-post');
});

router.post('/posts', async function (req, res) {

    res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {

    res.render('post-detail');
});

router.get('/posts/:id/edit', async function (req, res) {

    res.render('update-post');
});

router.post('/posts/:id/edit', async function (req, res) {

    res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {

    res.redirect('/posts');
});

module.exports = router;