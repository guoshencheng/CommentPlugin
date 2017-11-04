var mongodb = require('../mongodb');

const allMyApps = (req, res, next) => {
  const comment_user_id = req.session.comment_user_id;
  var App = mongodb.app.Model;
  App.find({ ownerId: comment_user_id }).then(docs => {
    res.json(docs.map(doc => doc.toJSON()));
  }).catch(next);
}
