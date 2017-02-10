const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get Categories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

module.exports.addCategory = function(category, callback){
	Category.create(category, callback)
}

//get single category by its ID
module.exports.getCategoryById = function(id, callback){
	Category.findById(id, callback); //encapsulating everything here to make a clean and structured code
}
//update Category
module.exports.updateCategory = function(query, update, options, callback) {
	Category.findOneAndUpdate(query, update, options, callback)
}

//delete Category
module.exports.removeCategory = function(query, callback) {
	Category.remove(query, callback)
}