var express = require('express');
var config = require('../config');
var router = express.Router();
var cors = require('cors');
var mongodb = require('../services/mongodb');
var shortid = require('shortid');
var controllers = require('../services/controllers');

var User = mongodb.user.Model;

const options = {
  credentials: true
}

var cross = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*");
  next();
}


//========================== start routes
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/success", function(req, res, next) {
  res.render("success", {
    GithubUser: {
    }
  })
})

// login
router.get('/comment/login', controllers.AuthController.login);

// users
router.get("/profile", cross, controllers.UserController.profile);
router.get("/users/:uid", cross, controllers.UserController.findById);


// coments
router.post('/comments', cors(options), controllers.CommentController.create);
router.get('/comments', cross, controllers.CommentController.allByScene);
router.options('/comments', cors(options));

router.get('/api/profile', cors(options), controllers.UserController.profile);

module.exports = router;
