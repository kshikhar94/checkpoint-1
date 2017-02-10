const mongoose = require('mongoose');

// Article Schema | We will have array of comments
const articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  category: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  created_at: {
    type: Date
  },
  comments: [{
    comment_subject: {
      type: String
    },
     comment_body: {
      type: String
    },
     comment_author: {
      type: String
    },
     comment_email : {
      type: String
    },
     comment_date: {
      type: String
    }
  }]  
});

const Article = module.exports = mongoose.model('Article', articleSchema);

// Get Articles
module.exports.getArticles = function(callback, limit){
  Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// Add article
module.exports.addArticle  = function(category, callback){
	Article.create(category, callback)
}

module.exports.getCategoryArticle = function(categoryId, callback) {
  var query = {category: categoryId}
  Article.find(query, callback).sort([['title', 'ascending']])
}

//get single article by its ID
module.exports.getArticleById = function(id, callback){
	Article.findById(id, callback); //encapsulating everything here to make a clean and structured code
}
//update Article
module.exports.updateArticle = function(query, update, options, callback) {
	Article.findOneAndUpdate(query, update, options, callback)
}

//Add comment to the Article
module.exports.removeArticle = function(query, callback) {
	Article.remove(query, callback)
}

module.exports.addComment = function(query, comment, callback){
  Article.update(query,
    {
      $push: {
        comments: comment
      }
    },
    callback
  );
}