var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/devices_development');

var deviceSchema = new mongoose.Schema({
  secret : String,
  physical : Object
});

module.exports = db.model('device', deviceSchema);
