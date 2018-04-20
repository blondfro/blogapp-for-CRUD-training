const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../models/article');

const db = 'mongodb://bloguser:user@ds149279.mlab.com:49279/blogapp';

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
  if(err) {
    console.log('Error Connecting');
  }
});

router.get('/all', function (req, res) {
  article.find({})
    .exec(function (err, article) {
      if (err) {
        console.log('Error getting the articles');
      } else {
        console.log(article);
        res.json(article);
      }
    })
});

router.get('/articles/:id', function(req, res) {
  console.log('Requesting a specific article');
  article.findById(req.params.id)
    .exec(function (err, article) {
      if (err) {
        console.log('Error getting the article');
      } else {
        res.json(article);
      }
    })
});

router.post('/create', function (req, res) {
  console.log('Posting an Article');
  var newArticle = new article();
  newArticle.title = req.body.title;
  newArticle.content = req.body.content;
  newArticle.save(function (err, article) {
    if (err) {
      console.log('Error inserting the article');
    } else {
      res.json(article);
    }
  })
});

module.exports = router;
