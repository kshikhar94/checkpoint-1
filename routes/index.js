const express = require('express');
const router = express.Router();
Article = require('../models/article.js')

router.get('/', (req, res, next) => {
	Article.getArticles(function (err, articles) {
		
		res.render('index', {title: 'Index', articles: articles});

	}, 2)
});

module.exports = router;
