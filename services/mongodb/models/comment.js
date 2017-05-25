var shortid = require('shortid');

module.exports = {
  _id: {
    type: String,
    'default': shortid.generate
  },
  username: String,
  avatar: String,
  comment: String,
  url: String
}
