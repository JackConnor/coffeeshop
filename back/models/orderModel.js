//DECLARING VARIABLES
//===========================
var mongoose  = require('mongoose')
var Order

//SCHEMA
//===========================
Order = new mongoose.Schema({
  uId         : {type: String, ref: 'User'},
  items       : [],
  total       : Number,
  created     : {type: Date, default: Date.now },
  updated     : {type: Date},
  cleared     : Date
}, {timestamps: true}) //testing timestamps

//METHODS
//===========================

// Middleware for checking updated timestamp?

// Order.genTimeStamp = function(next) {}?


//EXPORTS
//===========================
module.exports = mongoose.model( 'Order', Order )
