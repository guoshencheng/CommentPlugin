var shortid = require('shortid');

module.exports = {
  appName: {
    type: String,
    default: ""
  },
  secrectKey: {
    type: String,
    default: shortid.generate
  },
  appDescription: {
    type: String,
    default: ""
  },
  ownerId: {
    type: String
  }
};
