const express = require('express');
const router = express.Router();
const Article = require('../models/article.js');

router.get('/', (req, res, next) => {
    Article.getArticles( function(err, articles) {
        if (err) {
            res.send(err)
        }
        else {
            res.render('articles', {title: 'Articles', articles: articles});

        }
    })
});

router.get('/show/:id', (req, res, next) => {
    Article.getArticleById(req.params.id, function(err, article) {
        if (err){
            res.send(err)
        }
        else {
            res.render('article', {title: 'Article', article: article});
        }
    })
});

router.get('/category/:category_id', (req, res, next) => {
    Article.getCategoryArticle(req.params.category_id, function (err, articles){
        Category.getCategoryById(req.params.category_id, function(err, category) {
            res.render('articles', {title: category.title+' Articles', articles: articles});
        })
    })
});

//Add article: POST
router.post('/add', function (req, res, next) {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();
    req.checkBody('category', 'Category is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        Category.getCategories((err, categories) => {
        res.render('add_article', { errors: errors, title: 'Create Article', categories: categories });
    });
    }
    else {     
    var article = new Article()
    article.title = req.body.title
    article.subtitle = req.body.subtitle
    article.category = req.body.category
    article.body = req.body.body
    article.author = req.body.author

    Article.addArticle(article, function(err, article) {
        if (err) {
            res.send(err)
        }
        res.redirect('/manage/articles')
    })
    }
});


//Add article: POST
router.post('/edit/:id', function (req, res, next) {
    let article = new Article();
    var query = {_id: req.params.id} //typeof = object
    var update = {title: req.body.title, subtitle: req.body.subtitle, category: req.body.category, author: req.body.author, body: req.body.body}

    Article.updateArticle(query, update, {}, function(err, category) {
         if (err) {
            res.send(err)
        }
        res.redirect('/manage/articles')
    })    
});

//Delete Article: DELETE
router.delete('/delete/:id', function (req, res, next) {
    var query = {_id: req.params.id} //typeof = object | This query variable value will be passed to models/category.js and passed to function of MongoDb which performs delete operation 

    //Function in Model for this: updateArticle
    Article.removeArticle(query, function(err, article) {
         if (err) {
            res.send(err)
        }
        //We will redirect from JQuery Script. From here we will just send status ->>>> | CHANGED NOW
        res.status(200) //Changes made here | Earlier it was res.status(200)
    })    
});

//Add comment
router.post('/comments/add/:id', function (req, res, next) {
    console.log('Here')
    req.checkBody('comment_subject', 'Subject is required').notEmpty();
    req.checkBody('comment_author', 'Author is required').notEmpty();
    req.checkBody('comment_body', 'Body is required').notEmpty();
    let errors = req.validationErrors()
    if (errors) {
        //Fetch the article also and pass that along as well.
        console.log('err')
        Article.getArticleById(req.params.id, function(err, article) {
            res.render('article', {title: 'Article', article: article, errors: errors});
        })

    }
    else {
        let article = new Article();
        let query = {_id: req.params.id}
        //creating object for comment
        let comment = {
          comment_subject: req.body.comment_subject,
          comment_author: req.body.comment_author,
          comment_body: req.body.comment_body,
          comment_email: req.body.comment_email
        }

        Article.addComment(query, comment, (err, article) => {
          res.redirect('/articles/show/'+req.params.id);
        });
  }
});

module.exports = router;