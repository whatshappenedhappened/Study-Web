const express = require('express');
// const uuid = require('uuid');
// const db = require('../data/database_mysql');

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
    const query = `
    SELECT posts.*, authors.name 
    FROM posts 
    INNER JOIN authors ON (authors.id = posts.author_id)
    `;

    const [posts] = await db.query(query);
    const [post_count] = await db.query('SELECT COUNT(*) AS count FROM posts');

    res.render('posts-list', { posts: posts, post_count: post_count[0] });
});

router.get('/new-post', async function (req, res) {
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', { authors: authors });
});

router.post('/posts', async function (req, res) {
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ]

    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data]);

    res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {
    const query = `
    SELECT posts.*, authors.name, authors.email
    FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ?
    `;

    const [posts] = await db.query(query, [req.params.id]);

    if (!posts || posts.length === 0) {
        return res.status(404).render('404');
    }

    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        readableDate: posts[0].date.toLocaleString('kr-KR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    res.render('post-detail', { post : postData });
});

router.get('/posts/:id/edit', async function (req, res) {
    const query = `
    SELECT * FROM posts WHERE id = ?
    `;
    
    const [posts] = await db.query(query, [req.params.id]);

    if (!posts || posts.length === 0) {
        return res.status(400).render('404');
    }

    res.render('update-post', { post: posts[0] });
});

router.post('/posts/:id/edit', async function (req, res) {
    const query = `
        UPDATE posts SET title = ?, summary = ?, body = ?
        WHERE id = ?
    `;
    
    await db.query(query, [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.params.id
    ]);

    res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.redirect('/posts');
});

module.exports = router;