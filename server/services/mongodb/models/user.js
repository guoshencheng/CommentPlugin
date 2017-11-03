var shortid = require('shortid');

module.exports = {
  _id: {
    type: String,
    'default': shortid.generate
  },
  html_url: String,
  url: String,
  name: String,
  avatar_url: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  bio: String
}
