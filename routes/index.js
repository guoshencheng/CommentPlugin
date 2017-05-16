var express = require('express');
var router = express.Router();
var mongodb = require('../services/mongodb');

var cross = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
