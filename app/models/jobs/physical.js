var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/jobs_development');

var physicalSchema = new mongoose.Schema({
  data : mongoose.Schema.Types.Mixed,
  resource_id : mongoose.Schema.Types.ObjectId,
  physical_processed : {
    type : Boolean,
    default : false
  }
});

physicalSchema.set({
  capped : {
    size : 1024,
    max : 1000,
    autoIndexId : true
  }
});

module.exports = db.model('physical', physicalSchema);
