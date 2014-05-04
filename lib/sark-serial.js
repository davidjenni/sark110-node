'use strict';

var HID = require('node-hid');

var SARK_VENDOR_ID = 0x0483,
    SARK_PROD_ID = 0x5750,
    SARK_BUFFER_SIZE = 18,
    SARK_OK = 79;   // 'O'

function SarkSerial() {
  var sarkDevice = HID.devices(SARK_VENDOR_ID, SARK_PROD_ID);
  if (sarkDevice.length !== 1) {
    throw new Error("Cannot find SARK110, make sure it is connected via USB.");
  }
  this.hid = new HID.HID(sarkDevice[0].path);
}

SarkSerial.prototype.read = function(cmd, callback) {
  var buffer = new Buffer(SARK_BUFFER_SIZE);
  buffer.fill(0);
  buffer[0] = cmd;
  this.hid.write(buffer);
  this.hid.read(function(err, data) {
    if (err) {
      return callback(err);
    }
    if (data[0] !== SARK_OK) {
      return callback(new Error("SARK returned error: " + data[0]));
    }
    return callback(null, data.slice(1));
  });
};

module.exports = new SarkSerial();
