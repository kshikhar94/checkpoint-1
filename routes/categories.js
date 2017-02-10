const express = require('express');
const router = express.Router();
Category = require('../models/Category.js');

//Categories - GET
router.get('/', (req, res, next) => {
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
    res.render('categories', { title:'Categories', categories: categories});
  });
});

//Add category - POST |Express Validator 
router.post('/add', function (req, res, next) {
    // console.log('Here')
    //Performing Validation using express-validator
    req.checkBody('title', 'Title is required').notEmpty()
    req.checkBody('description', 'Description is required').notEmpty()

    var errors = req.validationErrors()
    if (errors) {
        res.render('add_category', {title: 'Create Category', errors: errors})
    }
    else {
        var category = new Category()
        category.title = req.body.title
        category.description = req.body.description
        Category.addCategory(category, function(err, category) {
            if (err) {
                res.send(err)
            }
            res.redirect('/manage/categories')
        })        
    }    
});

//Edit category -POST  |  Updating Database
router.post('/edit/:id', function (req, res, next) {
    // console.log(req.params.id) IMP
    // console.log(req.body.title) IMP
    req.checkBody('title', 'Title is required').notEmpty()
    req.checkBody('description', 'Description is required').notEmpty()
    var errors = req.validationErrors()

    if (errors) {
        res.render('edit_category', { errors: errors, title: 'Edit Category'})
    }
        

    else {
        let category = new Category();
        var query = {_id: req.params.id} //typeof = object
        var update = {title: req.body.title, description: req.body.description}
        //Function in Model for this: updateCategory
        Category.updateCategory(query, update, {}, function(err, category) {
             if (err) {
                res.send(err)
            }
            res.redirect('/manage/categories')
        })
    }
})

//Delete Category - Delete
router.delete('/delete/:id', function (req, res, next) {
    var query = {_id: req.params.id} //typeof = object | This query variable value will be passed to models/category.js and passed to function of MongoDb which performs delete operation 
    console.log('Execute')
    Category.removeCategory(query, function(err, category) {
         if (err) {
            res.send(err)
        }
        //We will redirect from JQuery Script. From here we will just send status ->>>> | CHANGED NOW
        res.status(200) //Changes made here | Earlier it was res.status(200)
    })    
});

module.exports = router;
