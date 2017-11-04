var shortid = require('shortid');

module.exports = {
  _id: {
    type: String,
    'default': shortid.generate
  },
  comment: {
    type: String,
    default: ""
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  appId: {
    type: String,
  },
  scene: {
    type: String
  }
}
