//DECLARING VARIABLES
//===========================
var mongoose  = require('mongoose')
var Order

//SCHEMA
//===========================
Order = new mongoose.Schema({
  uId         : { type: String, ref: 'User', required: true }, //require true later required: true, ref: 'User'
  items       : [ { type: String, ref: 'Item' } ],
  total       : Number,
  completed   : { type: Boolean, default: false },
  completedAt : Date
}, {timestamps: true}) //testing timestamps

//METHODS
//===========================

// Middleware for checking updated timestamp?

// Order.genTimeStamp = function(next) {}?


//EXPORTS
//===========================
module.exports = mongoose.model( 'Order', Order )
