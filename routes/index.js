var express = require('express');
var router = express.Router();
var mongodb = require('../services/mongodb');
var githubApi = require('../services/github/api.js');

var User = mongodb.user.Model;

var cross = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
}
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



router.get('/comment/login', function(req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const code = req.query.code;
  if (code) {
    githubApi.access_token(code).then((data) => {
      if (data.access_token) {
        return githubApi.user(data.access_token)
      } else {
        throw JSON.stringify(data);
      }
    }).then(data => {
      User.findOne({_id : data.id}).then(result => {
        if (result) {
          return result
        } else {
          const user = new User(Object.assign({}, data, { _id: data.id }));
          return user.save();
        }
      }).then(result => {
          var githubUser = result.toObject({ transform: true });
          res.cookie("comment_user_id", githubUser.id, { maxAge: 90000 });
          res.render("success", {
            GithubUser: githubUser
          });
      }).catch(reason => {
        next(reason);
      })
    }).catch(reason => {
      next(typeof reason == "string" ? new Error(reason) : reason);
    })
  } else {
    res.redirect(githubApi.redirectUrl(fullUrl))
  }
})

router.post('/comments', cross, function(req, res, next) {
  var body = req.body;
  var Comment = mongodb.comment.Model;
  var comment = new Comment(body);
  comment.save().then(doc => {
    res.json(doc.toObject({ transform: true }))
  }).catch(reason => {
    next(reason)
  })
  
})

router.get('/comments', cross, function(req, res, next) {
  console.log(req.cookies)
  var url = req.query.url;
  var Comment = mongodb.comment.Model;
  Comment.find({ url: url }).then(docs => {
    res.json(docs.map( doc => {
      return doc.toObject({ transform: true });
    } ));
  }).catch(reason => {
    next(reason);
  })
})


module.exports = router;
