var mongodb = require('../mongodb');

const create = (req, res, next) => {
  var body = req.body;
  var Comment = mongodb.comment.Model;
  var comment = new Comment(body);
  comment.save().then(doc => {
    res.json(doc.toObject({ transform: true }))
  }).catch(reason => {
    next(reason)
  })
}

const allByScene = (req, res, next) => {
  var scene =  decodeURIComponent(req.query.scene);
  var Comment = mongodb.comment.Model;
  Comment.find({ scene: scene }).then(docs => {
    res.json(docs.map(doc => {
      return doc.toObject({ transform: true });
    }));
  }).catch(reason => {
    next(reason);
  })
}

module.exports = {
  all, allByScene
}
