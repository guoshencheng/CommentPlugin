var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongodb = require('../services/mongodb');
var githubApi = require('../services/github/api.js');

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

router.options('/comments', cors(options));

router.post('/comments', cors(options), function(req, res, next) {
  var body = req.body;
  var Comment = mongodb.comment.Model;
  var comment = new Comment(body);
  comment.save().then(doc => {
    res.json(doc.toObject({ transform: true }))
  }).catch(reason => {
    next(reason)
  })
})

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

router.get("/users", cross, function(req, res, next) {
  const id = req.cookies.comment_user_id;
  if (id) {
    User.findOne({ _id: id }).then(result => {
      if (result) {
        res.json(result.toObject({ transform: true }))
      } else {
        throw new Error("no result");
      }
    }).catch(reason => {
      next(reason);
    });
  } else {
    res.json({
      noCookie: true
    })
  }
})

router.get("/users/:uid", cross, function(req, res, next) {
  const id = req.params.uid;
  User.findOne({ _id: id }).then(result => {
    if (result) {
      res.json(result.toObject({ transform: true }))
    } else {
      throw new Error("no result");
    }
  }).catch(reason => {
    next(reason);
  });
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
          res.cookie("comment_user_id", githubUser.id, { maxAge: "7d"});
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

router.get('/comments', cross, function(req, res, next) {
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
