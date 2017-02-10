var express = require('express');
var path = require('path');
var expressValidator = require('express-validator'); //https://www.npmjs.com/package/express-validator#usage
var mongoose = require('mongoose'); // https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications, https://www.npmjs.com/package/mongoose, http://mongoosejs.com/docs/guide.html

// Mongoose Connect
mongoose.connect('mongodb://heroku_vrr8gx51:rgg8m5bobe2s8dsq2r89idr5eb@ds147079.mlab.com:47079/heroku_vrr8gx51');
mongoose.Promise = global.Promise
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Port
var port = process.env.PORT || 3000;
// init app
var app = express();

var index = require('./routes/index');
var articles = require('./routes/articles');
var categories= require('./routes/categories');
var manage = require('./routes/manage');

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //https://pugjs.org/api/getting-started.html, https://www.npmjs.com/package/html2jade 


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Express validator middleware| source: https://github.com/ctavan/express-validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//if URL = /categories then use categories.js file 
app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port, () => {
  console.log('Server started on port '+port);
});
