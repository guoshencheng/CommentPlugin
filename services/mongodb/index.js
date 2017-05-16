var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var path = require('path');
var config = require('../../config.js');
var models = require('./models');

mongoose.connect(`mongodb://${config.mongodb.host}/comment`);

module.exports = models.reduce((pre, cur)=> {
  var DataModel = Object.assign({}, cur);
  var name = DataModel.__filename;
  delete DataModel.__filename;
  var ModelSchema = new Schema(DataModel);
  if (!ModelSchema.options.toObject) ModelSchema.options.toObject = {};
  ModelSchema.options.toObject.transform = function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
  var Model = mongoose.model(name, ModelSchema);
  return Object.assign({}, pre, {
    [name]: {
      DataModel, Model
    }
  })
}, {})






