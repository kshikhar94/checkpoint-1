const express = require('express');
const router = express.Router();
Category = require('../models/Category.js');
Article = require('../models/article.js')
//To view articles on manage/articles
router.get('/articles', (req, res, next) => {
  Article.getArticles(function (err, articles) {
    if (err) {
      res.send(err)
    }
    // console.log('Starts:')
    // console.log(articles)
  res.render('manage_articles', {title: 'Manage Articles', articles: articles});

  });
});

router.get('/categories', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
    	console.log(err)
    }
    // console.log('ON')
    // var arr = []

    // for(i=0; i<categories.length; i++) {
    // 	arr.push(categories[i].title)
    // };
    // console.log(arr)
    // res.render('categories', { title:'Categories', categories: arr});
    res.render('manage_categories', { title:'Categories', categories: categories});

  });
});

//We want to display the categories - drop down menu
router.get('/articles/add', (req, res, next) => {
  Category.getCategories( function(err, categories) {
    if (err) {
      res.send(err)
    }
  res.render('add_article', {title: 'Create Article', categories: categories});    
  })
});


router.get('/categories/add', (req, res, next) => {
  res.render('add_category', {title: 'Create Category'});
});


router.get('/articles/edit/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, function (err, article){
    if(err) {
      res.send(err)
    }
    Category.getCategories((err, categories) => {
    if (err) {
      console.log(err)
    }
    res.render('edit_article', {title: 'Edit Article', article: article, categories: categories});
  })
  })
});

router.get('/categories/edit/:id', (req, res, next) => {
	Category.getCategoryById(req.params.id, function (err, category){
		if(err) {
			res.send(err)
		}
		res.render('edit_category', {title: 'Edit Category', category: category}); //Passing the category to the html page like this
	})
});

module.exports = router;
