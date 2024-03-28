const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');

const router = express.Router();
const ObjectId = mongodb.ObjectId;

router.get('/', function (req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
  const posts = await db
    .getDb()
    .collection('posts')
    .find({}, { title: 1, summary: 1, 'author.name' : 1 })
    .toArray();
  // console.log(posts);
  res.render('posts-list', { posts: posts });
});

router.get('/new-post', async function (req, res) {
  const authors = await db
    .getDb()
    .collection('authors')
    .find()
    .toArray();
  console.log(authors);
  res.render('create-post', { authors: authors });
});

router.get('/posts/:id', async function (req, res, next) {

  let postId = req.params.id;

  try {
    postId = new ObjectId(postId)
  } catch (error) {
    return res.status(404).render('404');
    // return next(error);
  }

  const post = await db
    .getDb()
    .collection('posts')
    .findOne({ _id: postId }, { summary: 0 });
  
  if (!post) {
    return res.status(404).render('404');
  }

  post.humanReadableDate = post.date.toLocaleDateString('kr-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  post.date = post.date.toISOString();
  
  res.render('post-detail', { post: post });
});

router.get('/posts/:id/edit', async function (req, res, next) {

  let postId = req.params.id;

  try {
    postId = new ObjectId(req.params.id);
  } catch (error) {
    next(error);
  }

  const post = await db
    .getDb()
    .collection('posts')
    .findOne({ _id : new ObjectId(req.params.id) });

  res.render('update-post', { post });
});

router.post('/posts', async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  console.log(req.body.author);
  const author = await db
  .getDb()
  .collection('authors')
  .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email
    }
  }

  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result);

  res.redirect('/posts');
});

router.post('/posts/:id/edit', async function (req, res) {
  await db
    .getDb()
    .collection('posts')
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: 
        { title: req.body.title,
        summary: req.body.summary,
        body: req.body.content } 
      }
    );

  res.redirect('/posts');
});

router.post('/posts/:id/delete', async function (req, res) {
  const targetPost = new ObjectId(req.params.id);
  await db
    .getDb()
    .collection('posts')
    .deleteOne({ _id: targetPost });

  res.redirect('/posts');
});

module.exports = router;