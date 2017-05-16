var shortid = require('shortid');

module.exports = {
  _id: {
    type: String,
    'default': shortid.generate
  },
  id: String,
  username: String
}
