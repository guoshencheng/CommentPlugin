var mongodb = require('../mongodb');
var User = mongodb.user.Model;

var all = (req, res, next) => {

}

var profile = (req, res, next) => {
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
}

var findById = (req, res, next) => {
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
}


module.exports = {
  findById, profile
};
