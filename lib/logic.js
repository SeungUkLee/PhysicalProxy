var Device = require('../app/models/devices/device');
var Physical = require('../app/models/jobs/physical');

var request = require('request');
var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');

exports.excute = function () {
  return Physical.find({ physical_processed : false })
  .tailable().cursor().on('data', function(collection) {
    return start(collection);
  });
};

// (function(){})() 즉시실행함수
start = function(physical) {
  console.log("test 1 physical : ", physical);
  return (function(physical) {
    console.log("test 2 physical : ", physical);
    var findDevice = function(err, device) {
      if (err) {
        console.log("ERROR", err.message);
      }
      if (device && device.physical && device.physical.uri) {
        return request({
          uri : device.physical.uri,
          method : 'PUT',
          headers : { 'X-Physical-Secret' : device.secret, 'Content-Type' : 'application/json' },
          json : { nonce : uuid.v4(), properties : physical.data.properties }
        },
        function(err, response, body) {
          if (err) {
            console.log("ERROR", err.message);
          }
          console.log("DEBUG : request sent to ", device.physical);
        });
      }
    };

    var setPhysicalProcessed = function() {
      physical.physical_processed = true;
      return physical.save();
    };

    console.log("DEBUG : fetching new physical request");

    Device.findById(physical.resource_id, findDevice);
    return setPhysicalProcessed();
  })(physical);
};
