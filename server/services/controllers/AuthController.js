var githubApi = require('../github/api.js');
var mongodb = require('../mongodb');
var User = mongodb.user.Model;

const login = (req, res, next) => {
  var fullUrl = 'https://' + req.get('host') + req.originalUrl;
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
          req.session.comment_user_id = githubUser.id;
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
}

module.exports = {
  login
};
